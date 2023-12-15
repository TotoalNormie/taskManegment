<?php
	require_once("safe_encrypt.php");

	$___user_id_salt = hash("sha1", "1c3df731bcbd15dc6a7a4c5200741442c82199bad01f5");
	$___user_stamp = hash("sha1", "2bb9c81abda8851773df23af896b4bdf18d999ce59a9f");
	$___admin_stamp = hash("sha1", "3d6f2f5f7b084c1d31f5394e8359472a9c3a807420709");
	$___encryption_key = hash("sha256", "059e5b758d7ea1663b4bcc847dd454815ea828f8e90e1");

	enum SessionAuthority
	{
		case USER;
		case ADMIN;
	}

	function StampToEnum($stamp)
	{
		global $___user_stamp;
		global $___admin_stamp;

		switch($stamp)
		{
			case $___user_stamp:
				return SessionAuthority::USER;
			case $___admin_stamp:
				return SessionAuthority::ADMIN;

			default:
				return false;
		}
	}

	function EnumToStamp($authority)
	{
		global $___user_stamp;
		global $___admin_stamp;

		switch($authority)
		{
			case SessionAuthority::USER:
				return $___user_stamp;
			case SessionAuthority::ADMIN:
				return $___admin_stamp;
			
			default:
				return false;
		}
	}

	function GenerateUserID($username, $password)
	{
		global $___user_id_salt;

		return hash("sha256", $username . $___user_id_salt . $password);
	}

	class Session
	{
		public $user_identifier;
		public $expire_time;
		public $stamp;
		public $authority;

		public function __construct($user_identifier, $expire_time, $authority)
		{
			global $___user_stamp;
			global $___admin_stamp;			

			$this->user_identifier = $user_identifier;
			$this->expire_time = $expire_time;
			$this->authority = $authority;			

			$this->stamp = EnumToStamp($authority);
		}

		public function ToToken()
		{
			global $___encryption_key;
			global $___encryption_iv;
	
			return SafeEncrypt($this->user_identifier . "|" . $this->expire_time . "|" . $this->stamp, $___encryption_key);
		}

		static public function FromToken($token)
		{
			global $___encryption_key;
			global $___encryption_iv;
	
			$data = SafeDecrypt($token, $___encryption_key);
			if($data === false)
				return false;
			
			$data = explode("|", $data);
			if(intval($data[1]) <= time())
				return false;	
			
			if(!($authority = StampToEnum($data[2])))
				return false;
			
			return new Session($data[0], $data[1], $authority);
		}

		public function HasAuthority($authority)
		{
			return $this->authority === $authority;
		}
	}


	// generic session handling

	function HandleSession()
	{
		$failureMessage = null;

		$session = false;
		if(isset($_COOKIE["token"]))
		{
			if(!($session = Session::FromToken($_COOKIE["token"])))
			{
				setcookie("token", "", 1);
				$failureMessage = "Authentication Failed";
			}
		}
		else
		{
			$failureMessage = "Please Authenticate Yourself";
		}
		
		if($failureMessage)
			exit(CreateResponse(ResponseType::Failure, $failureMessage));

		return $session;
	}

	function HandleSessionSoft()
	{
		$session = false;
		if(isset($_COOKIE["token"]))
			if(!($session = Session::FromToken($_COOKIE["token"])))
				setcookie("token", "", 1);

		
		return $session;
	}
?>