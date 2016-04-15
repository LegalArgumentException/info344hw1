<?php
/*
	Tanner Garrett 
	4/13/2016
	Informatics 344
	HW1

	Description : This file holds the PHP used to query a database full of NBA players
*/
	// Credentials for the server
	$username = "info344user";
	$password = "Blitz71223";
	// String the user passed in
	$name = '%' . $_GET["name"] . '%';
	try {
		$conn = new PDO('mysql:host=i344rds.cpqodlnrgncx.us-west-2.rds.amazonaws.com;dbname=NBA_STATS', $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$stmt = $conn->prepare('SELECT * FROM `NBA_STATS` WHERE LOWER(NBA_STATS.Name) LIKE LOWER(:name)');

		// Execute statement to limit the possibility of SQL Injection Attacks
		$stmt->execute(array('name' => $name));
		
		$rows = array();
		foreach($stmt as $row) {
			$rows[] = $row;
		}
		echo(json_encode($rows));
	} catch(PDOException $e) {
		echo('ERROR: ' . $e->getMessage());
	}
?>