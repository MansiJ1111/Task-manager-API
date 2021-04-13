const sgMail=require('@sendgrid/mail')

const sendGridAPIKey='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'

 sgMail.setApiKey(sendGridAPIKey)

 sgMail.send({

to:'mjadhav7555@gmail.com',
from:'mjadhav7555@gmail.com',
subject:'This is my first cretion',
text:'Mansi Jadhav'
 })