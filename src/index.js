import 'dotenv/config'

import Discord, { MessageActionRow, Modal, TextInputComponent, Formatters } from 'discord.js'
import { token } from './config'

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_PRESENCES', 'GUILD_MESSAGES'],
})

client.once('ready', () => {
  console.log('SWADE project manager is online')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  if (interaction.commandName === 'project') {
    // Create the modal
    const modalPageOne = new Modal()
      .setCustomId('swadeProjectManager')
      .setTitle('SWADE Project Manajer')
    // const modalPageTwo = new Modal()
    // 	.setCustomId('swadeProjectManager')
    // 	.setTitle('SWADE Project Manajer');
    // Add components to modal
    // Create the text input components
    const project = new TextInputComponent()
      .setCustomId('project')
      // The label is the prompt the user sees for this input
      .setLabel('What is the project?')
      // Short means only a single line of text
      .setStyle('SHORT')
    const successes = new TextInputComponent()
      .setCustomId('successes')
      .setLabel('How many successes are required?')
      // Paragraph means multiple lines of text.
      .setStyle('SHORT')
    const critFail = new TextInputComponent()
      .setCustomId('critFail')
      .setLabel('What happens when you get a critical fail?')
      // Paragraph means multiple lines of text.
      .setStyle('SHORT')
    const skill = new TextInputComponent()
      .setCustomId('skill')
      .setLabel('What skill is required?')
      .setStyle('SHORT')
    const cost = new TextInputComponent()
      .setCustomId('cost')
      .setLabel('What does the project costs?')
      .setStyle('SHORT')
    const materials = new TextInputComponent()
      .setCustomId('materials')
      .setLabel('What materials are required?')
      .setStyle('PARAGRAPH')
    const tools = new TextInputComponent()
      .setCustomId('tools')
      .setLabel('What tools are required?')
      .setStyle('PARAGRAPH')
    const assignees = new TextInputComponent()
      .setCustomId('assignees')
      .setLabel('Who is working on this project')
      .setStyle('SHORT')
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new MessageActionRow().addComponents(project)
    const secondActionRow = new MessageActionRow().addComponents(successes)
    const thirdActionRow = new MessageActionRow().addComponents(critFail)
    const fourthActionRow = new MessageActionRow().addComponents(skill)
    const fifthActionRow = new MessageActionRow().addComponents(cost)
    const sixthActionRow = new MessageActionRow().addComponents(materials)
    const seventhActionRow = new MessageActionRow().addComponents(tools)
    const eighthActionRow = new MessageActionRow().addComponents(assignees)

    // Add inputs to the modal
    modalPageOne.addComponents(
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow,
      fifthActionRow
    )
    // modalPageTwo.addComponents(sixthActionRow, seventhActionRow, eighthActionRow);
    // Show the modal to the user
    await interaction.showModal(modalPageOne)
    // await interaction.showModal(modalPageTwo);
  }
})

client.on('interactionCreate', interaction => {
  if (!interaction.isModalSubmit()) return
  const project = interaction.fields.getTextInputValue('project')
  const successes = interaction.fields.getTextInputValue('successes')
  const critFail = interaction.fields.getTextInputValue('critFail')
  const skill = interaction.fields.getTextInputValue('skill')
  const cost = interaction.fields.getTextInputValue('cost')
  // const materials = interaction.fields.getTextInputValue('materials');
  // const tools = interaction.fields.getTextInputValue('tools');
  // const assignees = interaction.fields.getTextInputValue('assignees');
  console.log({ project, successes, critFail, skill, cost })
})

client.on('modalSubmit', async modal => {
  console.log(interaction.id)
})

// client.on('messageCreate', (message) => {
//     if (message.content == 'hi') {
//         const embed = new Discord.MessageEmbed()
//         .setTitle('Projects')
//         .setDescription('This is a new Project')
//         message.reply({embeds: [embed]})
//     }
// })

client.login(token)
