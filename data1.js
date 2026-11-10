// Requirement text is copied from each badge's page on scouting.org (2026), as listed.
// Each top-level requirement: n = number, h = official stem text, pick = how many options to choose (0 = do all),
// items = [id, official text, tag, camp note]. Items with empty text mean the requirement itself is the checkbox.
// Tags: P = the camp project itself meets it, T = separate step but can use the camp as the topic, O = outside the project.
window.BADGES = window.BADGES || [];
window.BADGES.push(
{id:"movie",name:"Moviemaking",fit:"Full",eagle:false,link:"https://www.scouting.org/merit-badges/moviemaking/",
why:"The promo videos are the badge. Plan one camp feature properly and nearly every requirement comes out of it.",
reqs:[
{n:"1",h:"Discuss and demonstrate the proper elements of a good motion picture. In your discussion, include visual storytelling, rhythm, the 180-axis rule, camera movement, framing and composition of camera shots, and lens selection.",pick:0,items:[
 ["1","","P","Demonstrate on location while shooting camp footage."]]},
{n:"2",h:"Do the following:",pick:0,items:[
 ["2a","In a three- or four-paragraph treatment, tell the story you plan to produce, making sure that the treatment conveys a visual picture.","P","Treatment for the camp promo."],
 ["2b","Prepare a storyboard for your motion picture. Note: This can be done with rough sketches and stick figures.","P","Storyboard the promo before camp day."],
 ["2c","Demonstrate the following motion picture shooting techniques: (1) Using a tripod (2) Panning a camera (3) Framing a shot (4) Selecting an angle (5) Selecting proper lighting (6) Handheld shooting","P","Put one of each on the shot list."],
 ["2d","Using motion picture shooting techniques, plan ONE of the following programs. Start with a treatment and complete the requirement by presenting this program to a pack or your troop, patrol, or class. (1) Film a court of honor and show it to an audience. (2) Create a short feature of your own design, using the techniques you learned. (3) Shoot a vignette that could be used to train a new Scout in a Scouting skill.","T","Option (2) is the camp promo. It must be shown to a pack, troop, patrol, or class."]]},
{n:"3",h:"Do ONE of the following:",pick:1,items:[
 ["3a","With your parent or guardian's permission and your counselor's approval, visit a film set or television production studio and watch how production work is done.","O",""],
 ["3b","Explain to your counselor the elements of the zoom lens and three important parts.","T","Use the camera or phone lens you film with."]]},
{n:"4",h:"Do ONE of the following:",pick:1,items:[
 ["4a","Explore careers related to this merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include—with your parent or guardian's permission—an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.","O",""],
 ["4b","Explore how you could use knowledge and skills from this merit badge to pursue a hobby or healthy lifestyle. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursued this.","O",""]]}
]},
{id:"dt",name:"Digital Technology",fit:"Full (with side tasks)",eagle:false,link:"https://www.scouting.org/merit-badges/digital-technology/",
why:"The website, photos, QR code, and voiceover cover a lot. The knowledge pieces are separate.",
reqs:[
{n:"1",h:"View the Personal Safety Awareness \"Digital Safety\" video (with your parent or guardian's permission).",pick:0,items:[["1","","O",""]]},
{n:"2",h:"Do the following:",pick:0,items:[
 ["2a","Give a brief history of the changes in digital technology over time. Discuss with your counselor how digital technology in your lifetime compares with that of your parent's, grandparent's, or other adult's lifetime.","O",""],
 ["2b","Describe what kinds of computers or devices you imagine might be available when you are an adult.","O",""]]},
{n:"3",h:"Do the following:",pick:0,items:[
 ["3a","Explain to your counselor how text, sound, and pictures are digitized for storage.","T","Use your camp photos and video audio as examples."],
 ["3b","Describe the difference between lossy and lossless data compression, and give an example where each might be used.","T","Compressed video for social media vs. the original files."],
 ["3c","Describe two digital devices and how they are made more useful by their programming.","O",""],
 ["3d","Discuss the similarities and differences between computers, mobile devices, and gaming consoles.","O",""],
 ["3e","Explain what a computer network is and the difference between a local area network (LAN) versus a wide area network (WAN).","O",""]]},
{n:"4",h:"Do the following:",pick:0,items:[
 ["4a","Explain what a program or software application or \"app\" is and how a computer uses a CPU and memory to execute it.","T",""],
 ["4b","Name four software programs or mobile apps you or your family use, and explain how each one helps you.","T","Editing, website, and design apps from the project count."],
 ["4c","Describe what malware is, and explain how to protect your digital devices and the information stored on them.","O",""],
 ["4d","Explain what a barcode, a QR code, and an RFID tag are along with the data they contain and two or more examples where each is used.","T","The QR code on the flyer that links to booking."]]},
{n:"5",h:"Do the following:",pick:0,items:[
 ["5a","Describe at least two different ways data can be transferred through the internet.","O",""],
 ["5b","Using an internet search engine (with a parent or guardian's permission), find ideas from at least three different websites about how to conduct a troop court of honor or campfire program. Present the ideas to your counselor and explain how you used a search engine to find this information.","O","Topic is set by the requirement."],
 ["5c","Use a web browser to connect to an HTTPS (secure) website (with your parent or guardian's permission). Explain to your counselor how to tell whether the site's security certificate can be trusted, and what it means to use this kind of connection.","T","Check the camp booking page."]]},
{n:"6",h:"Do THREE of the following. For each project you complete, copy the files to a backup device and share the finished projects with your counselor.",pick:3,items:[
 ["6a","Using a spreadsheet or database program, develop a food budget for a patrol weekend campout OR create a troop roster that includes the name, rank, patrol, and telephone number of each Scout. Show your counselor that you can sort the roster by each of the following categories: rank, patrol, and alphabetically by name.","O",""],
 ["6b","Using a word processor, write a draft letter inviting the parents or guardians of your troop's Scouts to a troop event.","O",""],
 ["6c","Using a graphics program, design and draw a campsite plan for your troop OR create a flyer for an upcoming troop event, incorporating text and some type of visual such as a photograph or an illustration.","O","The camp flyer is not for a troop event, so it doesn't fit as written."],
 ["6d","Using a presentation software program, develop a report about a topic approved by your counselor. For your presentation, create at least five slides, with each one incorporating text and some type of visual such as a photograph or an illustration.","P","Slides on the camp project."],
 ["6e","Using a digital device, take a picture of a troop activity. Send or transfer this image to a device where it can be shared with your counselor.","O","Counts only if it's a troop activity."],
 ["6f","Make a digital recording of your voice, transfer the file to a different device, and have your counselor play back the recording.","P","The promo video voiceover."],
 ["6g","Create a blog and use it as an online journal of your Scouting activities, including group discussions and meetings, campouts, and other events. Include at least five entries and two photographs or illustrations. Share your blog with your counselor. You need not post the blog to the internet; however, if you choose to go live with your blog, you must first share it with your parent or guardian AND counselor AND get their approval.","T","Blog the badge work as a Scouting activity."],
 ["6h","Create a webpage for your troop, patrol, school, or place of worship. Include at least three articles and two photographs or illustrations. Include at least one link to a website of interest to your audience. You need not post the page to the internet; however, if you decide to do so, you must first share the webpage with your parent or guardian AND counselor AND get their approval.","O","The camp website is not one of the four listed."]]},
{n:"7",h:"Do the following:",pick:0,items:[
 ["7a","Explain to your counselor each of these protections and why they exist: copyright, patents, trademarks, and trade secrets.","T","Who owns the camp photos; music in the video."],
 ["7b","Explain when it is permissible to accept a free copy of a program from a friend.","O",""],
 ["7c","Discuss with your counselor an article or (with your parent or guardian's permission) a report on the internet about a recent legal case involving an intellectual property dispute.","O",""]]},
{n:"8",h:"Do TWO of the following:",pick:2,items:[
 ["8a","Describe why it is important to properly dispose of digital technology. List at least three hazardous chemicals that could be used to create digital devices or used inside a digital device.","O",""],
 ["8b","Explain to your counselor why it is important to use a certified recycler of digital technology hardware or devices.","O",""],
 ["8c","Do an internet search for an organization that collects discarded digital technology hardware or devices for repurposing or recycling. Find out what happens to that waste. Share with your counselor what you found.","O",""],
 ["8d","Visit a recycling center that disposes of digital technology hardware or devices. Find out what happens to that waste. Share what you learned with your counselor.","O",""],
 ["8e","Find a battery recycling center near you and find out what it does to recycle batteries. Share what you have learned with your counselor about the proper methods for recycling batteries.","O",""]]},
{n:"9",h:"Do ONE of the following:",pick:1,items:[
 ["9a","Explore careers related to the Digital Technology merit badge. Research one career to learn about the training and education needed, costs, job prospects, salary, job duties, and career advancement. Your research methods may include—with your parent or guardian's permission—an internet or library search, an interview with a professional in the field, or a visit to a location where people in this career work. Discuss with your counselor both your findings and what about this profession might make it an interesting career.","O",""],
 ["9b","Explore how you could use knowledge and skills from the Digital Technology merit badge to pursue a hobby or interest. Research any training needed, expenses, and organizations that promote or support it. Discuss with your counselor what short-term and long-term goals you might have if you pursued this.","O",""]]}
]}
);
