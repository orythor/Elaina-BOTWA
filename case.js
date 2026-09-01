/*
Elaina MD v1.00.0.1

Base Script Asli : FallZx-Infinity (Hillary MD)
Direbrand & dikembangkan jadi Elaina MD

Subscribe Yt : FallZx-Features
Base Script Asli : https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D

JANGAN DIHAPUS, RECODE SILAHKAN TAPI DILARANG KERAS UNTUK HAPUS CREDITS 
*/


//===================[ TEMPAT MODULE ]=====================\\
require("./config")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { exec } = require("child_process")
const chalk = require('chalk')
const moment = require('moment-timezone');
const didyoumean = require('didyoumean');
const similarity = require('similarity')

module.exports = async (Lily, m) => {
try {
const from = m.key.remoteJid
const body = (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) ? (
(m.mtype === 'conversation' && m.message.conversation) ||
(m.mtype === 'imageMessage' && m.message.imageMessage.caption) ||
(m.mtype === 'documentMessage' && m.message.documentMessage.caption) ||
(m.mtype === 'videoMessage' && m.message.videoMessage.caption) ||
(m.mtype === 'extendedTextMessage' && m.message.extendedTextMessage.text) ||
(m.mtype === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ||
(m.mtype === 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId)
) : '';

//==================[ TEMPAT CONST LIB ]=====================\\
const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom } = require('./lib/myfunc')
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/respon-list');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/setdone');

//===================[ TAMPAT PREFIX / ADMIN / OWNER ]====================\\
const budy = (typeof m.text === 'string') ? m.text : '';
const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const sender = m.key.fromMe ? (Lily.user.id.split(':')[0]+'@s.whatsapp.net' || Lily.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await Lily.decodeJid(Lily.user.id)
const senderNumber = sender.split('@')[0]
const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)


const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const groupMetadata = m.isGroup ? await Lily.groupMetadata(from).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
//=================[ TEMPAT FUNCTION DATABASE ]====================\\
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let listStore = JSON.parse(fs.readFileSync('./database/list-message.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));


//===================[ TAMPILAN CONSOLE ]=====================\\
if (m.message) {
console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', from))
}

//==================[ FUNCTION FITUR ]=====================\\
// Gak Usah Di Apa Apain Jika Tidak Mau Error
try {
ppuser = await Lily.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)
try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let limitUser = global.limitawal.free
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.limit)) user.limit = limitUser
} else global.db.data.users[m.sender] = {
afkTime: -1,
afkReason: '',
limit: limitUser,
}
} catch (err) {
console.log(err)
} 

// respon list 
if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)) {
var get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
if (get_data_respon.isImage === false) {
Lily.sendMessage(m.chat, { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) }, {
quoted: m
})
} else {
Lily.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: m
})
}
}

const reSize = async(buffer, ukur1, ukur2) => {
   return new Promise(async(resolve, reject) => {
      let jimp = require('jimp')
      var baper = await jimp.read(buffer);
      var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
      resolve(ab)
   })
}
    const fkethmb = await reSize(ppuser, 300, 300)
    // function resize
    let jimp = require("jimp")
const resize = async (image, width, height) => {
    const read = await jimp.read(image);
    const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
    return data;
};

//self public
// per-socket (Lily.public), bukan global.public — kalo global, satu sesi jadibot
// toggle .self bakal ikut ngubah mode punya sesi lain juga
if (!Lily.public) {
if (!m.key.fromMe && !isCreator) return
}

//===================[ FUNCTION REPLY ]=====================\\


const reply = (teks) => { 
Lily.sendMessage(from, { text: teks, contextInfo: { 
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Hillaryours", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://youtube.com/@fallzx-features", 
"sourceUrl": "https://youtube.com/@fallzx-features" }}}, { quoted: m }) }

const reply2 = (teks) => {
Lily.sendMessage(from, { text : teks }, { quoted : m })
}

//==================[ FUNCTION WAKTU ]======================\\
function getFormattedDate() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
}

let d = new Date(new Date + 3600000)
let locale = 'id'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
const hariini = d.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " jam " + minutes + " menit " + seconds + " detik"
}

function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
		// +minutes+":"+sec;
  }

// Sayying time
const timee = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(timee < "23:59:00"){
var waktuucapan = 'Selamat Malam 🌃'
}
if(timee < "19:00:00"){
var waktuucapan = 'Selamat Petang 🌆'
}
if(timee < "18:00:00"){
var waktuucapan = 'Selamat Sore 🌅'
}
if(timee < "15:00:00"){
var waktuucapan = 'Selamat Siang 🏙'
}
if(timee < "10:00:00"){
var waktuucapan = 'Selamat Pagi 🌄'
}
if(timee < "05:00:00"){
var waktuucapan = 'Selamat Subuh 🌉'
}
if(timee < "03:00:00"){
var waktuucapan = 'Tengah Malam 🌌'
}



//==================[ FUNCTION RESPON SALAH ]======================\\
if (prefix && command) {
let caseNames = getCaseNames();
function getCaseNames() {
const fs = require('fs');
try {
const data = fs.readFileSync('case.js', 'utf8');
const casePattern = /case\s+'([^']+)'/g;
const matches = data.match(casePattern);
if (matches) {
const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
return caseNames;
} else {
return [];
} } catch (err) {
console.log('Terjadi kesalahan:', err);
return [];
}}
let noPrefix = command
let mean = didyoumean(noPrefix, caseNames);
let sim = similarity(noPrefix, mean);
let similarityPercentage = parseInt(sim * 100);
if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
let response = `Maaf, command yang kamu berikan salah. mungkin ini yang kamu maksud:\n\n•> ${prefix+mean}\n•> Kemiripan: ${similarityPercentage}%`
m.reply(response)
}}

//=================[ TEMPAT CASE DI BAWAH INI ]=================\\
switch(command) {


case 'menu': case 'help': case 'allmenu': case 'Elaina':{
Lily.sendMessage(from, {react: {text: "🧐", key: m.key}})
let anu = `
ʜᴀʟᴏ ᴋᴀᴋ 👏

sᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ ᴅɪ sɪᴍᴘʟᴇ ᴍᴇɴᴜ \`ᴇʟᴀɪɴᴀ ᴍᴅ\`. ᴅɪʀᴇʙʀᴀɴᴅ ᴅᴀʀɪ ʙᴀsᴇ sᴄʀɪᴘᴛ \`ғᴀʟʟᴢx - ɪɴғɪɴɪᴛʏ\`, sᴀʏᴀ ᴀᴅᴀʟᴀʜ ʙᴏᴛ ʀᴀᴍᴀʜ ᴅᴀɴ ʟᴜᴄᴜ 🙂‍↕. 

✧┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✧
> [ *⎙ INFO BOT* ]
> ɴᴀᴍᴀ   : ᴇʟᴀɪɴᴀ ᴍᴅ
> ᴏᴡɴᴇʀ  : ${global.author}
> ᴠᴇʀꜱɪ   :  ${global.versi}
✧┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈✧

┏─ *MENU STORE*
┃• list
┃• addlist
┃• dellist
┃• updatelist
┃• setproses
┃• changeproses
┃• delsetproses
┃• setdone
┃• changedone
┃• delsetdone
┗
┏─ *MENU OWNER*
┃• self
┃• public
┗
┏─ *MENU LAIN*
┃• jadibot
┗`
reply2(anu)
 }
break;


//===================[ TEMPAT CASE MENU STORE ]=====================\\
case 'list': case 'store': {
	Lily.sendMessage(from, {
		react: {
			text: "🧐",
			key: m.key
		}
	})
	if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
	if (!isAlreadyResponListGroup(m.chat, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
	let teks = `Halo @${m.sender.split("@")[0]} berikut beberapa list yang tersedia saat ini.\n\n`
	for (let i of db_respon_list) {
		if (i.id === m.chat) {
			teks += `- ${i.key.toUpperCase()}\n`
		}
	}
	teks += `\n\nUntuk melihat detail produk, silahkan kirim nama produk yang ada pada list di atas. Misalnya kamu ingin melihat detail produk dari ${db_respon_list[0].key.toUpperCase()}, maka kirim pesan ${db_respon_list[0].key.toUpperCase()} kepada bot`
	Lily.sendMessage(m.chat, {
		text: teks,
		mentions: [m.sender]
	}, {
		quoted: m
	})
}
break
//=========================\\
case 'addlist':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
var args1 = q.split("|")[0].toLowerCase()
var args2 = q.split("|")[1]
if (!q.includes("|")) return reply(`Gunakan dengan cara ${prefix+command} *key|response*\n\n_Contoh_\n\n${prefix+command} tes|apa`)
if (isAlreadyResponList(m.chat, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
if (/image/.test(mime)) {
	let media = await Lily.downloadAndSaveMediaMessage(quoted)
	const fd = new FormData();
	fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
	fetch('https://telegra.ph/upload', {
			method: 'POST',
			body: fd
		}).then(res => res.json())
		.then((json) => {
			addResponList(m.chat, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
			reply(`Sukses set list message dengan key : *${args1}*`)
			if (fs.existsSync(media)) fs.unlinkSync(media)
		})
} else {
	addResponList(m.chat, args1, args2, false, '-', db_respon_list)
	reply(`Sukses set list message dengan key : *${args1}*`)
}
break
//=========================\\
case 'dellist':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *key*\n\n_Contoh_\n\n${prefix + command} hello`)
if (!isAlreadyResponList(m.chat, q.toLowerCase(), db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
delResponList(m.chat, q.toLowerCase(), db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
//=========================\\
case 'updatelist': case 'update':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
var args1 = q.split("|")[0].toLowerCase()
var args2 = q.split("|")[1]
if (!q.includes("|")) return reply(`Gunakan dengan cara ${prefix+command} *key|response*\n\n_Contoh_\n\n${prefix+command} tes|apa`)
if (!isAlreadyResponListGroup(m.chat, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
if (/image/.test(mime)) {
	let media = await Lily.downloadAndSaveMediaMessage(quoted)
	const fd = new FormData();
	fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
	fetch('https://telegra.ph/upload', {
			method: 'POST',
			body: fd
		}).then(res => res.json())
		.then((json) => {
			updateResponList(m.chat, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
			reply(`Sukses update respon list dengan key *${args1}*`)
			if (fs.existsSync(media)) fs.unlinkSync(media)
		})
} else {
	updateResponList(m.chat, args1, args2, false, '-', db_respon_list)
	reply(`Sukses update respon list dengan key *${args1}*`)
}
break
//=========================\\
case 'setproses': case 'setp':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
if (isSetProses(m.chat, set_proses)) return reply(`Set proses already active`)
addSetProses(text, m.chat, set_proses)
reply(`✅ Done set proses!`)
break
//=========================\\
case 'changeproses': case 'changep':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Pesanan sedang di proses ya @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
if (isSetProses(m.chat, set_proses)) {
	changeSetProses(text, m.chat, set_proses)
	reply(`Sukses ubah set proses!`)
} else {
	addSetProses(text, m.chat, set_proses)
	reply(`Sukses ubah set proses!`)
}
break
//=========================\\
case 'delsetproses': case 'delsetp':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!isSetProses(m.chat, set_proses)) return reply(`Belum ada set proses di gc ini`)
removeSetProses(m.chat, set_proses)
reply(`Sukses delete set proses`)
break
//=========================\\
case 'setdone': {
	Lily.sendMessage(from, {
		react: {
			text: "🧐",
			key: m.key
		}
	})
	if (!m.isGroup) return reply('Fitur Khusus Group!')
	if (!isAdmins) return reply('Fitur Khusus admin!')
	if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
	if (isSetDone(m.chat, set_done)) return reply(`Udh set done sebelumnya`)
	addSetDone(text, m.chat, set_done)
	reply(`Sukses set done!`)
}
break
//=========================\\
case 'changedone': case 'changed':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!text) return reply(`Gunakan dengan cara ${prefix + command} *teks*\n\n_Contoh_\n\n${prefix + command} Done @user\n\n- @user (tag org yg pesan)\n- @pesanan (pesanan)\n- @jam (waktu pemesanan)\n- @tanggal (tanggal pemesanan) `)
if (isSetDone(m.chat, set_done)) {
	changeSetDone(text, m.chat, set_done)
	reply(`Sukses ubah set done!`)
} else {
	addSetDone(text, m.chat, set_done)
	reply(`Sukses ubah set done!`)
}
break
//=========================\\
case 'delsetdone': case 'delsetd':
Lily.sendMessage(from, {
	react: {
		text: "🧐",
		key: m.key
	}
})
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!isSetDone(m.chat, set_done)) return reply(`Belum ada set done di gc ini`)
removeSetDone(m.chat, set_done)
reply(`Sukses delete set done`)
break


//===================[ TEMPAT CASE MENU AI ]=====================\\
case 'luminai': {
	Lily.sendMessage(from, {
		react: {
			text: "🧐",
			key: m.key
		}
	})
	if (!text) return m.reply(`Contoh: ${prefix+command} hai luminai`);
	const requestData = {
		content: text,
		user: m.sender
	};
	const quoted = m && (m.quoted || m);
	try {
		let response;
		if (quoted && /image/.test(quoted.mimetype || quoted.msg.mimetype)) {
			requestData.imageBuffer = await quoted.download();
		}
		response = (await axios.post('https://lumin-ai.xyz', requestData)).data.result;
		m.reply(response);
	} catch (err) {
		m.reply(err);
	}
}
break

//===================[ TEMPAT CASE MENU OWNER ]=====================\\
case 'self': {
if (!isCreator) return tolakk(mess.OnlyOwner)
Lily.public = false
m.reply('Sukses Change To Self Mode')
}
break

case 'public': {
if (!isCreator) return tolakk(mess.OnlyOwner)
Lily.public = true
m.reply('Sukses Change To Public Mode')
}
break

case 'jadibot': {
if (m.isGroup) return reply('Kirim .jadibot lewat chat pribadi ke bot ya, bukan di group.')
const { startJadibotSession } = require('./lib/jadibot')
await m.reply('Oke, bentar ya, lagi disiapin sesi kamu...')
await startJadibotSession(Lily, m)
}
break


//===================[ TEMPAT CASE MENU GROUP ]=====================\\


//===================[ TEMPAT CASE MENU GAME ]=====================\\


//===================[ BATAS CASE ]=====================\\
default:


if ((budy) && ["proses", "Proses",].includes(budy) && !isCmd) {
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!m.quoted) return reply('Reply pesanan yang akan proses')
let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Pending\`\`\`\n\n📝 Catatan :\n@pesanan\n\nPesanan @user sedang di proses!`
const getTextP = getTextSetProses(m.chat, set_proses);
if (getTextP !== undefined) {
var anunya = (getTextP.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', timee).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0]))
Lily.sendTextWithMentions(m.chat, anunya, m)
} else {
Lily.sendTextWithMentions(m.chat, (proses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', timee).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0])), m)}
}

if ((budy) && ['done', "Done"].includes(budy) && !isCmd) {
if (!m.isGroup) return reply('Fitur Khusus Group!')
if (!isAdmins) return reply('Fitur Khusus admin!')
if (!m.quoted) return reply('Reply pesanan yang telah di proses')
let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Berhasil\`\`\`\n\nTerimakasih @user Next Order ya🙏`
const getTextD = getTextSetDone(m.chat, set_done);
if (getTextD !== undefined) {
var anunya = (getTextD.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', timee).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0]))
Lily.sendTextWithMentions(m.chat, anunya, m)
} else {
Lily.sendTextWithMentions(m.chat, (sukses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', timee).replace('@tanggal', tanggal(new Date())).replace('@user', '@' + m.quoted.sender.split("@")[0])), m)}
}


if (budy.startsWith('=>')) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

if (budy.startsWith('$')) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}

} catch (err) {
console.log(util.format(err))
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
