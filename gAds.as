//Useful info about Google Ads politics and tech specs here: https://support.google.com/adwordspolicy/answer/176108#


//clickTAG snippet needed to run Google Ads with AS3
//You don't need to specify the URL here, because will be setup through the clickTAG later

import flash.events.MouseEvent;
import flash.net.URLRequest;

myBtn.buttonMode = true; //remember to change myBtn with your custom movie clip / button
myBtn.addEventListener(
	MouseEvent.CLICK,
	function(event: MouseEvent) : void {
		flash.net.navigateToURL(new URLRequest( root.loaderInfo.parameters.clickTAG), "_blank");
	}
);