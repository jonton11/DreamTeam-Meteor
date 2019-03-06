# DreamTeam

DreamTeam application helps users to build up their dream teams.

## Technologies Used

* Meteor
* Blaze
* MongoDB
* HTML
* CSS

## To use the DreamTeam application

1. a user creates the user account and will be redirected to the Personal page which users can edit or update their profile. Moreover, all teams that the user has joined will be displayed on the page.
2. On the Teams page, users can view all teams, create new teams, search for new members and add the new member to their team. Furthermore, users can view team members for the teams they have joined.

## Data Structure

users and teams are 2 main data collections for this application
Meteor comes with a default MongoDB collection for user data.

Here’s an example of a user for users collection

{ 
	"_id" : "KxMXhZdSv9KGrZ97u",
	 "createdAt" : ISODate("2019-03-05T21:20:29.998Z"), 
	"services" : { 
		"password" : { 
			"bcrypt" : "XXX" 
		},
		 "resume" : {
			 "loginTokens" : [ ] 
 	  } }, 
	"username" : "js", 
	"emails" : [ { "address" : "js@hot.com", "verified" : false } ],
	"profile" : { 
		"firstName" : "John", 
		"lastName" : "Snow", 
		"teams" : [ "ss8F5YQf8TYwPayn6" ] 
	}
 }

Here’s an example of a team for teams collection

{ 
	"_id" : "ss8F5YQf8TYwPayn6", 
	"name" : "burnaby", 
	"createdAt" : ISODate("2019-03-05T21:20:57.928Z"), 
	"createdBy" : "KxMXhZdSv9KGrZ97u", 
	"members" : [ "KxMXhZdSv9KGrZ97u", "yGRii3brTts9Dt6Q5" ]
 }

## More information for DreamTeam application

This application was built based on Meteor Todo application https://www.meteor.com/tutorials/blaze/creating-an-app. From the tutorial, it shows how to set up the user account by using "account-ui" and "account-password" but I would like to use my custom template for login and register pages so, I decided to use only "account-password" to manage user collection then follow this document https://docs.meteor.com/api/passwords.html#Accounts-createUser for creating a user account. I also have a custom button for "signup by GitHub" and follow this document https://docs.meteor.com/api/accounts.html#Meteor-loginWith%3CExternalService%3E for login with GitHub service.

One more challenging thing for me is creating many to many relationship between users and teams. as one user can join more than one team and one team can have more than one member. Using Meteor tutorial and stackoverflow.com I got a solution that users collection will store an array of teams that the user has joined for example {teams: [team1, team2]} and teams collection will store an array of team members for example: { members: [member1, member2]}

In the future, I would like to implement removing team feature. a team can be removed by only a person who created the team. Moreover, I would like to add forget password, reset password features into the application.