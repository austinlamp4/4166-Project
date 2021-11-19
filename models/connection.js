/*
Author: Austin Lamp
Date: 10/13/21; Last edited: 11/04/21
Description: Contains the set up of the schema & db for collections
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const connectionSchema = new Schema(
    {
        name:  {type: String, required: [true, 'Connection Name is required']},
        category: {type: String, required: [true, 'Connection Category is required']},
        details: {type: String, required: [true, 'Connection Details are required'],  minLength: [10, 'The content should have at least 10 characters']},
        date: {type: String, required: [true, 'Connection Date is required']},
        start_time: {type: String, required: [true, 'Start Time is required']},
        end_time: {type: String, required: [true, 'End Time is required']},
        host_name: {type: String, required: [true, 'Host Name is required']},
        image: {type: String, required: [true, 'Image Path is required']}
    }//,
    //{timestamps: true}
);

/*
Desc: The below function is a function that is used within an ejs file so the categories can be displayed in alphabetical order dynamically.
Date: 11/04/21
Author: C. Austin Lamp
*/
connectionSchema.statics.findCategories = function(connections) {
    const categories = [];
    for (let i = 0; i < connections.length; i++) {
        if(!categories.includes(connections[i].category)) {
            categories.push(connections[i].category);
        }
    }
    return categories;
};


//Corresponding collection name needs to be lowercase and plural, aka connections.
module.exports = mongoose.model('Connection', connectionSchema); //First arg is a name, and second is a schema











/*
const {v4: uuidv4} = require('uuid');

const connections = [
    {
        id: '1',
        name: 'CompTIA Security+ Study Group',
        category: 'Studying',
        details: 'The CompTIA Security+ is a vendor neutral, entry level Cyber Security certification meant to help build the foundation for analysts looking to improve their skillset and get into, or above entry level roles. Because of this, there will always be ongoing study sessions as this is a very popular certification many people are always studying for. Please, see details below for more information on our Security+ connect group for study buddies, resources, and more!',
        date: 'Every Wednesday Night/Thursday Night',
        start_time:'6:30 PM',
        end_time:'8:30 PM',
        host_name: 'Cybersecurity Connections',
        image: '/images/Sec+.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '2',
        name: 'CompTIA Network+ Study Group',
        category: 'Studying',
        details: 'The CompTIA Network+ is a vendor neutral, entry level Networking certification meant to help build the foundation for analysts and network administrators looking to improve their skillset and get into, or above entry level roles. Because of this, there will always be ongoing study sessions as this is a very popular certification many people are always studying for. Please, see details below for more information on our Network+ connect group for study buddies, resources, and more!',
        date: 'Every Tuesday Night',
        start_time:'6:30 PM',
        end_time:'8:30 PM',
        host_name: 'Cybersecurity Connections',
        image: '/images/net+.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '3',
        name: 'CompTIA CySA+ Study Group',
        category: 'Studying',
        details: 'The CompTIA CySA+ is a vendor neutral, Intermediate Cybersecurity Analyst certification meant to help build the foundation for security analysts and engineers looking to improve their skillset and get into, or above entry level roles. Because of this, there will always be ongoing study sessions as this is a very popular certification many people are always studying for. Please, see details below for more information on our CySA+ connect group for study buddies, resources, and more!',
        date: 'Every Friday night',
        start_time:'6:30 PM',
        end_time:'8:30 PM',
        host_name: 'Cybersecurity Connections',
        image: '/images/CySA.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '4',
        name: 'Offensive Security\'s OSCP Study Guide',
        category: 'Studying',
        details: 'Offensive Security\'s OSCP is considered an entry level offensive security certification and an advanced level general security certification. It is a practical examination created and hosted by Offensive Security, the creators of the famous Kali Linux distribution. It is a hands on certification that requires months of adequate preparation for most, and is a very popular certification among offensive security specialists. Please, see details below for a OSCP connect group for studdy buddies, resources, and more!',
        date: 'Every other Friday (odd days)',
        start_time:'6:00 PM',
        end_time:'10:00 PM',
        host_name: 'Offensive Security',
        image: '/images/oscp.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '5',
        name: 'Cisco\'s CCNA Study Group',
        category: 'Studying',
        details: 'Cisco\'s CCNA is considered an intermediate level networking certification that provides detailed and practical knowledge on their networking devices commonly used in enterprise infrastructure. It is a very popular networking exam for Networking Administrators and those trying to build a solid foundation of knowledge within the realm of networking. It generally takes months of adequate preparation for most, and is a very popular certification in the networking world among engineers, analysts, and administrators. Please, see the details below for more on a CCNA study group, along with finding buddies, resources, and more!',
        date: 'Every other Friday (even days)',
        start_time:'6:00 PM',
        end_time:'10:00 PM',
        host_name: 'Cisco',
        image: '/images/ccna.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '6',
        name: 'Applied Network Security conference',
        category: 'Conferences',
        details: 'There are currently no Network Security conferences submitted. Please use the buttons to the right to submit an applied network security conference as the one scheduled was recently closed.',
        date: 'N/A',
        start_time:'N/A',
        end_time:'N/A',
        host_name: 'N/A',
        image: '/images/sorry.jfif' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '7',
        name: 'Applied Web Application Security conference',
        category: 'Conferences',
        details: 'OWASP is hosting an annual web application security conference discussing common vulnerabilities within web applications and how to test for them, as well as fix them. OWASP is considered the top organization for Web Application Security is constantly surrounded by some of the most brilliant minds and engineers within the field, and will go through practical examples of how to test for the OWASP top 10, as well as easy remediations for the majority of web applications with these types of vulnerabilities.',
        date: '10/31/2021',
        start_time: '4:00 PM',
        end_time: '9:00 PM',
        host_name: 'OWASP',
        image: '/images/owasp.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '8',
        name: 'Red Teaming and Offensive Security conference',
        category: 'Conferences',
        details: 'Offensive Security is hosting a Penetration Testing and Offensive Security conference. There will be little matters as far as discussion based around traditional red teaming, where you would be simulating an active threat actor inside a network environment, and more focused on the actual testing of applications and the alike. This will focus on common methodology used by offensive engineers, how to write reports, and resources to begin and improve your career within the field of offensive security, lead to by the leaders of offensive security themselves. This conference will discuss everything from reconnaissance to exploitation and the final report that will be delivered to a company after a penetration test.',
        date: '10/24/2021',
        start_time: '12:00 PM',
        end_time: '5:00 PM',
        host_name: 'Offensive Security',
        image: '/images/offsec.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id:'9',
        name: 'Good, Great, Exceptional Security Architecture conference',
        category: 'Conferences',
        details: 'A security architecture conference hosted by OWASP focusing on security architecture within web applications will be help to discuss the good, the bad, and the ugly of security architecture. Tune in to learn more about the basics and more advanced topics of designing security within a web application and the networking surrounding the server hosting the web application, with discussion on how this could be implemented within your environment to increase security for your personal use, enterprise, and more.',
        date: '11/14/2021',
        start_time:'3:00PM',
        end_time:'6:00PM',
        host_name: 'OWASP',
        image: '/images/owasp.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '10',
        name: 'Connect with a mentor',
        category: 'Networking',
        //Note, when we use a ;, the page renders that as a line break per the usage within the ejs template.
        details: 'Bill Johansen: Offensive Security, email: billjo@gmail.com; Josh Stanley: Network Security, email: Josh.Stanley@gmail.com; Gunnar Peterson: Security Architecture, email: gunnarp@gmail.com;',
        date: '',
        start_time:'',
        end_time:'',
        host_name: '',
        image: '/images/mentors.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '12',
        name: 'Become a mentor/friend',
        category: 'Networking',
        details: 'To become a mentor/friend to others within the industry, please use the edit functionality within the mentors page OR reach out to the moderators of the page, using austinlamp4@gmail.com as the email you direct your message to.',
        date: '',
        start_time:'',
        end_time:'',
        host_name: '',
        image: '/images/mentors.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '13',
        name: 'Random Meetups',
        category: 'General/Misc.',
        details: 'Please, feel free to edit and add random meetups as you see fit. Or reach out to the page admin at austinlamp4@gmail.com',
        date: '',
        start_time:'',
        end_time:'',
        host_name: '',
        image: '/images/meetups.png' //Put a image URL for this. Should still be rendered in View.
    },
    {
        id: '14',
        name: 'Other resources',
        category: 'General/Misc.',
        details: 'For general security resources, please look at the following web pages;https://www.offensive-security.com/;https://owasp.org/;https://www.reddit.com/r/cybersecurity/comments/e23ffz/security_certification_progression_chart_2020/;https://krebsonsecurity.com/;https://www.hackthebox.eu/;https://tryhackme.com/;',
        date: '',
        start_time:'',
        end_time:'',
        host_name: '',
        image: '/images/free.jfif' //Put a image URL for this. Should still be rendered in View.
    }
]

exports.find = () => connections;


exports.findById = (id) => {
    return connections.find(connection=>connection.id === id);
};

exports.save = (connection) => {
    connection.id = uuidv4();
    connections.push(connection);
}

exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection => connection.id === id);
    console.log(connection);
    console.log(newConnection);
    if (connection) {
        connection.name = newConnection.name;
        connection.details = newConnection.details;
        connection.date = newConnection.date;
        connection.start_time = newConnection.start_time;
        connection.end_time = newConnection.end_time;
        connection.host_name = newConnection.host_name;
        //Whatever else needs to go in here !!--Please make sure you get everything and then delete this comment--!!
        return true;
    } else {
        return false;
    }
};

exports.deleteById = function(id) {
    let index = connections.findIndex(connection => connection.id === id);
    if(index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}
*/