const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const fs = require('fs');
const axios = require('axios');
const { errorMessage, infoMessage } = require('../helpers');
const IG_DESC = "Instagram "
const NEED_WORD = "Must Enter a link"
const FBDESC = "Facebook"
const LOADING = "Not found..."
const NOT_FOUNDFB = "Not found!"
const CAPTION = "Caption"

Asena.addCommand({ pattern: 'ig ?(.*)', fromMe: false, desc: IG_DESC}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(NEED_WORD))

    await message.sendMessage(infoMessage("Post ..."))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/igdown?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`

	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {quoted: message.data}, {
          caption: "Copyright © 2022 | 🅤𝚗𝚔𝚗𝚘𝚠𝚗 🅗𝚊𝚌𝚔𝚎࿐"
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {quoted: message.data}, {
          caption: "Copyright © 2022 | 🅤𝚗𝚔𝚗𝚘𝚠𝚗 🅗𝚊𝚌𝚔𝚎࿐"
        })}
	
        
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(" Instagram link")),
      )
  },
)




Asena.addCommand({ pattern: 'fb ?(.*)', fromMe: false, desc: FBDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(NEED_WORD))

    await message.sendMessage(infoMessage(LOADING))

    await axios
      .get(`https://videfikri.com/api/fbdl/?urlfb=${userName}`)
      .then(async (response) => {
        const {
          url,
          judul,
        } = response.data.result

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${CAPTION}*: ${judul}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {quoted: message.data}, {
          caption: "Copyright © 2022 | 🅤𝚗𝚔𝚗𝚘𝚠𝚗 🅗𝚊𝚌𝚔𝚎࿐"
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(NOT_FOUNDFB )),
      )
  },
)
