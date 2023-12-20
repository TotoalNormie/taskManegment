<?php
	enum ResponseType
	{
		case Success;
		case Failure;
		case Error;
	}

	function _GetResponseType($responseType)
	{
		switch($responseType)
		{
			case ResponseType::Success:
				return "Success";
			case ResponseType::Failure:
				return "Failure";
			default:
				return "Unknown";
		}
	}

	function CreateResponse($status, $message, $data=null)
	{
		$out_array = [
			"status" => _GetResponseType($status),
			"message" => $message
		];

		if($data !== null)
			$out_array["data"] = $data;

		return json_encode($out_array);
	}

	function GetAllRequestData()
	{
		$out = file_get_contents("php://input");

		$decodedJson = json_decode($out, true);
		if($decodedJson === null)
			mb_parse_str($out, $out);
		else
			$out = $decodedJson;

		return $out;
	}

	function ValidateObjectArray($targetArray, $objectKeys)
	{
		$targetCount = count($targetArray);
		$keyCount = count($objectKeys);
		for($target_i = 0; $target_i < $targetCount; ++$target_i)
			for($key_i = 0; $key_i < $keyCount; ++$key_i)
				if(!isset($targetArray[$target_i][$objectKeys[$key_i]]))
					return false;
		
		return true;
	}

	function FindArrayKey($targetArray, $keys)
	{
		$keyCount = count($keys);
		for($key_i = 0; $key_i < $keyCount; ++$key_i)
			if(isset($targetArray[$keys[$key_i]]))
				return true;
		
		return false;
	}

	function FindArrayKeys($targetArray, $keys)
	{
		$count = 0;

		$keyCount = count($keys);
		for($key_i = 0; $key_i < $keyCount; ++$key_i)
			if(isset($targetArray[$keys[$key_i]]))
				++$count;
		
		return $count;
	}

	function GetHeader($name)
	{
		$name = strtoupper($name);
		$headerName = str_replace("-", "_", $name);
		if(isset($_SERVER["HTTP_".$headerName]))
		{
			return $_SERVER["HTTP_".$headerName];
		}
		else
		{
			$headers = getallheaders();
			$headerCount = count($headers);
			foreach($headers as $header=>$value)
				if(strtoupper($header) === $name)
					return $value;

			return null;
		}
	}

	function HSVToHEX($h, $s, $v)
    {
		$h /= 360;
		$s /= 100;
		$v /= 100;

 		if($s == 0) 
		{ 
			$r = $g = $b = $v * 255; 
		} 
		else 
		{ 
			$h = $h * 6; 
			$i = floor($h);
			$f = $h - $i;
			
			$m = $v * (1 - $s ); 
			$n = $v * (1 - $s * $f ); 
			$k = $v * (1 - $s * (1 - $f )); 

			if       ($i == 0) { $r = $v; $g = $k; $b = $m; } 
			else if  ($i == 1) { $r = $n; $g = $v; $b = $m; } 
			else if  ($i == 2) { $r = $m; $g = $v; $b = $k; } 
			else if  ($i == 3) { $r = $m; $g = $n; $b = $v; }
			else if  ($i == 4) { $r = $k; $g = $m; $b = $v; } 
			else               { $r = $v; $g = $m; $b = $n; }

			$r = round($r * 255);
			$g = round($g * 255);
			$b = round($b * 255);
        }

        $r = dechex($r);
		if(strlen($r) < 2)
			$r = "0" . $r;
		
		$g = dechex($g);
		if(strlen($g) < 2)
			$g = "0" . $g;

		$b = dechex($b);
		if(strlen($b) < 2)
			$b = "0" . $b;

		return "#" . $r . $g . $b;
    }

	function StringSum($str)
	{
		$out = 0;
		$len = strlen($str);
		for($i = 0; $i < $len; ++$i)
			$out += ord($str[$i]);

		return $out;
	}

	function GenerateColorFromString($str)
	{
		srand(StringSum($str));

		return HSVToHEX(rand(0, 36)*10, 44, 100);
	}
?>