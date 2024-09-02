const mongoose=require("mongoose");
const chat=require("./models/chats");


main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allMesseges = [
    {
        from: "Alice",
        to: "Bob",
        msg: "Hey, how's it going?",
        created_at: new Date('2024-09-01T08:00:00Z')
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Hi Alice! I'm doing well, thanks. How about you?",
        created_at: new Date('2024-09-01T08:05:00Z')
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "I'm great! Just working on some projects.",
        created_at: new Date('2024-09-01T08:10:00Z')
    },
    {
        from: "Charlie",
        to: "Dana",
        msg: "Did you get the report I sent?",
        created_at: new Date('2024-09-01T09:00:00Z')
    },
    {
        from: "Dana",
        to: "Charlie",
        msg: "Yes, I did. I'll get back to you shortly.",
        created_at: new Date('2024-09-01T09:15:00Z')
    },
    {
        from: "Eve",
        to: "Frank",
        msg: "Are we still on for the meeting later?",
        created_at: new Date('2024-09-01T10:00:00Z')
    },
    {
        from: "Frank",
        to: "Eve",
        msg: "Yes, the meeting is still on. See you at 3 PM.",
        created_at: new Date('2024-09-01T10:05:00Z')
    },
    {
        from: "Grace",
        to: "Hank",
        msg: "Can you send me the latest updates on the project?",
        created_at: new Date('2024-09-01T11:00:00Z')
    },
    {
        from: "Hank",
        to: "Grace",
        msg: "Sure, I'll email them to you shortly.",
        created_at: new Date('2024-09-01T11:10:00Z')
    },
    {
        from: "Ivy",
        to: "Jack",
        msg: "Thanks for helping with the presentation yesterday!",
        created_at: new Date('2024-09-01T12:00:00Z')
    }
];

chat.insertMany(allMesseges).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})