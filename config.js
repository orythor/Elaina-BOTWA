/*
Elaina MD v1.00.0.1

Base Script Asli : FallZx-Infinity (Hillary MD)
Direbrand & dikembangkan jadi Elaina MD

Subscribe Yt : FallZx-Features
Base Script Asli : https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D

JANGAN DIHAPUS, RECODE SILAHKAN TAPI DILARANG KERAS UNTUK HAPUS CREDITS 
*/

//===================[ OWNER ]=====================\\

global.versi = '1.00.0.1'
global.botname = ["ᴇʟᴀɪɴᴀ ᴍᴅ"]
global.botnumber = ["6288-xxxxc-xxxx-xx3"]
global.websitex = ['https://myportfolio-nu-dusky.vercel.app/']
global.qris = "https://tmpfiles.org/dl/14330235/tmp.jpg"
global.packname = 'ᴇʟᴀɪɴᴀ ᴍᴅ'
global.author = 'ᴇʟᴀɪɴᴀ ᴍᴅ'

global.owner = [
  "6285813708397", //ganti nomor biar bot nya Respon 
  "" //nomor owner kedua kalo ada
]
//===================[ GROUP AND SALURAN ]=====================\\
global.linknya = 'https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D'
global.idsaluran2 = ['120363186130999681@newsletter']
//===================[ FUNCTION LAIN NYA ]=====================\\
global.fotonya2 = "https://telegra.ph/file/c5eb1485207e04371bc19.jpg"
global.wlcm = []
global.wlcmm = []
global.limitawal = {
    premium: "Infinity",
    free: 20
}

//===================[ MESS ]=====================\\
global.mess = {
    success: '𝙳𝚘𝚗𝚎 𝙺𝚊𝚔 ',
    admin: '_*❗Perintah Ini Hanya Bisa Digunakan Oleh Admin Group !*_',
    botAdmin: '_*❗Perintah Ini Hanya Bisa Digunakan Ketika Bot Menjadi Admin Group !*_',
    OnlyOwner: '_*❗Perintah Ini Hanya Bisa Digunakan Oleh Owner !*_',
    OnlyGrup: '_*❗Perintah Ini Hanya Bisa Digunakan Di Group Chat !*_',
    private: '_(❗Perintah Ini Hanya Bisa Digunakan Di Private Chat !*_',
    wait: '_*Wait Tunggu Sebentar*_',
    notregist: '_*Kamu Belum Terdaftar Di Database Bot Silahkan Daftar Terlebih Dahulu_*',
    premium: '_*khusus Premium" Mau Prem? Chat Owne_*',
    endLimit: '_*Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Pukul 00:00 WIB_*.',
}


let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})