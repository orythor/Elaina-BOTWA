/*
Elaina MD

Base Script Asli : FallZx-Infinity (Hillary MD)
Direbrand & dikembangkan jadi Elaina MD

JANGAN DIHAPUS, RECODE SILAHKAN TAPI DILARANG KERAS UNTUK HAPUS CREDITS
*/

// Fitur .jadibot — sesi WhatsApp terpisah per nomor, jalan pake logic
// case.js yang sama kayak bot utama, tapi punya socket & store sendiri-sendiri
// biar nggak nyampur satu sama lain (kontak, grup, mode self/public, dll).

const { default: makeWASocket, DisconnectReason, makeInMemoryStore, useMultiFileAuthState } = require("@adiwajshing/baileys")
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

const smsg = require('./smsg')
const attachSocketHelpers = require('./socket-helpers')

const JADIBOT_DIR = path.join(__dirname, '..', 'jadibot')
if (!fs.existsSync(JADIBOT_DIR)) fs.mkdirSync(JADIBOT_DIR, { recursive: true })

// nomor -> instance socket yang lagi aktif, dicek sebelum bikin sesi baru
global.childBots = global.childBots || new Map()

function newStore() {
return makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
}

async function createChildSocket(number, store, m = null) {
const sessionPath = path.join(JADIBOT_DIR, number)
const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
const sock = makeWASocket({
version: [2, 3000, 1015901307],
logger: pino({ level: "silent" }),
printQRInTerminal: false,
auth: state,
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: false,
markOnlineOnConnect: true,
browser: ["Ubuntu", "Chrome", "20.0.04"],
})

attachSocketHelpers(sock, store)
store.bind(sock.ev)

if (!sock.authState.creds.registered) {
try {
let code = await sock.requestPairingCode(number)
code = code?.match(/.{1,4}/g)?.join("-") || code
if (m) await m.reply(`Kode pairing kamu:\n\n*${code}*\n\nBuka WhatsApp di HP kamu > Perangkat Tertaut > Tautkan Perangkat > masukin kode di atas. Buruan, kodenya cuma bentar berlakunya.`)
console.log(`[JADIBOT] Kode pairing ${number}: ${code}`)
} catch (err) {
console.log(`[JADIBOT] Gagal request kode buat ${number}:`, err)
if (m) await m.reply(`Gagal minta kode pairing: ${err.message || err}`)
return null
}
}

sock.ev.on('messages.upsert', async (chatUpdate) => {
try {
let mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!sock.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
let sm = smsg(sock, mek, store)
require("../case")(sock, sm, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

sock.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'open') {
global.childBots.set(number, sock)
console.log(`[JADIBOT] ${number} terhubung`)
if (m) m.reply('Sesi kamu berhasil terhubung. Bot kamu sekarang jalan sendiri, kirim *.menu* buat liat command yang bisa dipake.').catch(() => {})
} else if (connection === 'close') {
global.childBots.delete(number)
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.restartRequired || reason === DisconnectReason.timedOut) {
console.log(`[JADIBOT] ${number} putus (${reason}), coba nyambung ulang...`)
createChildSocket(number, store)
} else if (reason === DisconnectReason.loggedOut) {
console.log(`[JADIBOT] ${number} logout, sesi dihapus`)
fs.rmSync(sessionPath, { recursive: true, force: true })
} else {
console.log(`[JADIBOT] ${number} disconnect gak dikenal (${reason}), sesi dihapus`)
fs.rmSync(sessionPath, { recursive: true, force: true })
}
}
})

sock.ev.on('creds.update', saveCreds)

return sock
}

// dipanggil dari case.js pas ada yang ngirim .jadibot
async function startJadibotSession(mainConn, m) {
const number = m.sender.split('@')[0]
if (global.childBots.has(number)) {
return m.reply('Kamu udah punya sesi bot aktif. Kalo mau bikin ulang, logout dulu dari perangkat tertaut di WhatsApp kamu, baru kirim .jadibot lagi.')
}
await createChildSocket(number, newStore(), m)
}

// dipanggil sekali pas index.js start, buat nyambungin ulang sesi yang udah ada
async function restoreJadibotSessions() {
if (!fs.existsSync(JADIBOT_DIR)) return
const numbers = fs.readdirSync(JADIBOT_DIR).filter(f => fs.statSync(path.join(JADIBOT_DIR, f)).isDirectory())
if (!numbers.length) return
console.log(`[JADIBOT] Nyambungin ulang ${numbers.length} sesi lama...`)
for (const number of numbers) {
createChildSocket(number, newStore()).catch(err => console.log(`[JADIBOT] Gagal restore ${number}:`, err))
}
}

module.exports = { startJadibotSession, restoreJadibotSessions }
