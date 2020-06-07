<?php

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
	//Receive the RAW post data.
	$content = trim(file_get_contents("php://input"));

	$decoded = json_decode($content, true);
var_dump( $decoded);
	//If json_decode failed, the JSON is invalid.
	if(! is_array($decoded)) {

	} else {
		// Send error back to user.
	}
}

$array = Array (
	"0" => Array (
		"id" => "MMZ301",
		"name" => "Michael Bruce",
		"designation" => "System Architect"
	),
	"1" => Array (
		"id" => "MMZ385",
		"name" => "Jennifer Winters",
		"designation" => "Senior Programmer"
	),
	"2" => Array (
		"id" => "MMZ593",
		"name" => "Donna Fox",
		"designation" => "Office Manager"
	)
);

// encode array to json
//$json = json_encode(array('data' => $array));
//
////write json to file
//if (file_put_contents("data.json", $json))
//	echo "JSON file created successfully...";
//else
//	echo "Oops! Error creating json file...";