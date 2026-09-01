/*
Elaina MD

Base Script Asli : FallZx-Infinity (Hillary MD)
Direbrand & dikembangkan jadi Elaina MD

JANGAN DIHAPUS, RECODE SILAHKAN TAPI DILARANG KERAS UNTUK HAPUS CREDITS
*/

// Dipindah dari index.js apa adanya (logic sama persis) biar bisa dipake ulang
// sama sesi jadibot (lib/jadibot.js), bukan cuma bot utama.
// Nempelin method-method ini ke socket supaya case.js bisa jalan normal
// di socket manapun yang dikasih (bot utama ATAU sesi anak jadibot).

const { jidDecode, downloadContentFromMessage } = require("@adiwajshing/baileys")
const PhoneNumber = require('awesome-phonenumber')
const fs = require('fs')

function attachSocketHelpers(conn, store) {
conn.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

conn.getName = (jid, withoutContact = false) => {
let id = conn.decodeJid(jid)
withoutContact = conn.withoutContact || withoutContact
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === conn.decodeJid(conn.user.id) ?
conn.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

// default mode self (privat) sampe di-.public-in manual oleh pemilik sesi
conn.public = false

conn.serializeM = (m) => require('./smsg')(conn, m, store)

conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })

conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
let trueFileName = attachExtension ? ('./sticker/' + filename + '.' + type.ext) : './sticker/' + filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

conn.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

return conn
}

module.exports = attachSocketHelpers
