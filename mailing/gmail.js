const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const juice = require('juice');
const dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const userSignUp = async ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `mailing/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};

const otpSend = async ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `mailing/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};

const userUpdate = async ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `mailing/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};
const userPassword = async ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `mailing/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};

const userPasswordReset = async ({
  template: templateName,
  templateVars,
  ...restOfOptions
}) => {
  const templatePath = `mailing/templates/${templateName}.html`;
  const options = {
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }
  return transporter.sendMail(options);
};

export { userSignUp, userUpdate, userPassword, userPasswordReset, otpSend };
