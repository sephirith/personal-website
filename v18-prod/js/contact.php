<?php

// Email to Send Message
$email1 = "sephirith@gmail.com"; 
$subject = "Contact Form Message";  
$empty_fields_message = "<p><font color = 'red'>Please go back and complete all the fields in the form. (Use a legitimate email.)</font></p>"; 

$email = stripslashes($_POST['email']); 

if (empty($email)) 
{ 
 echo 'Please make sure that you fill up all the required fields!';
} 
else 
{ 
	//Verify Email
	if (isValidEmail($email)) 
	{	

            
    		if(mail($email1, $subject, $message, "From: <$email>"))
			{
				echo 1;
			} else
			echo 'Could not connect to DB.';
	}
	else 
	{
		echo '<b>E-mail not Valid.</b>';
	} 
} 

function isValidEmail($email){
	return eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email);
}
?>