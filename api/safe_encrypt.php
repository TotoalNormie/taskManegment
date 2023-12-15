<?php
	$___hmac_key = hash("sha256", "6f630b6e7d54b17b6a781dacdece2f6c0565a131dbdca7fc6050a14ad3308558");

	// up to you to have a secure key
	function SafeEncrypt($data, $key)
	{
		global $___hmac_key;

		$iv = substr(hash("sha256", openssl_random_pseudo_bytes(32)), 0, 16);
		
		$cipher_text = openssl_encrypt($data, "aes-256-cbc", $key, 0, $iv);

		return $cipher_text . $iv . hash_hmac("sha1", $cipher_text, $___hmac_key);
	}

	function SafeDecrypt($full_cipher_text, $key)
	{
		global $___hmac_key;

		$cipher_text = substr($full_cipher_text, 0, -(16+40));
		$mac = substr($full_cipher_text, -40);
		if(!hash_equals(hash_hmac("sha1", $cipher_text, $___hmac_key), $mac))
			return false;

		$iv = substr($full_cipher_text, -(16+40), 16);

		
		return openssl_decrypt($cipher_text, "aes-256-cbc", $key, 0, $iv);
	}
?>