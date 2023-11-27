/*-JW BOX-*/
var iOSorAndroid = navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/android/i) != null;
var theclientHeight = document.documentElement.clientHeight == 0;
var isMobile = (/iphone|ipod|android|ie|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
var hasParent;

var jwpBoxPlayer = null;

if (iOSorAndroid){
	window.addEventListener('orientationchange', function()
	{
		if (window.orientation == 90 || window.orientation == -90){
			window.scrollTo(0,0);
		}
	},false);
}

fadePlayerIn = function(isVideo, isAudio)
{
	document.getElementById('outerLayer').style.overflow = 'visible';	
	document.getElementById('theTxt').style.visibility = "visible";
	$("#theBorder").fadeIn(1000);
	$("#theBg").fadeIn();
	$("#outerLayer").fadeIn();
	$("#theTxt").fadeIn(400, function() 
	{
		document.onclick = function(event)
		{
			hasParent = false;
			for(var node = event.target; node != document.body; node = node.parentNode)
			{
				if(node.id == 'outerLayer')
				{
					hasParent = true;
					break;
				}
			}
			if(!hasParent)
			{
				if(theclientHeight)
				{
					displayNone();

					if (jwpBoxPlayer != null)
						jwpBoxPlayer.stop();
				}
				else 
				{
					if($(event.target).closest('#theBorder').length === 0)
					{
						fadePlayerOut();

						if (jwpBoxPlayer != null)
							jwpBoxPlayer.stop();								
					}
				}
			}
		}
	});
	
	if (isVideo)
		$("#outerLayer").animate({"height" : "75%", "width": "75%"}, 500);
	
	if (isAudio)
		$("#outerLayer").animate({"height" : "10%", "width": "75%"}, 500);
		
	theBg.style.width = '100%';
	theBg.style.height = '100%';
	theBg.style.top = "0px";
	theBg.style.left = "0px";
	theBg.style.margin = "0px";
	theBorder.style.top = "8%";
	theBorder.style.left = "8%";
	
	theTxt.style.position = "fixed";
	theTxt.style.marginLeft = "1%";
	theTxt.style.marginTop = "1%";
	theTxt.style.cursor = "pointer";
	theTxt.style.zIndex = "9999999";
	
	if (isVideo)
	{
		theTxt.style.left = "8%";
		theTxt.style.top = "8%";
	}
	
	if (isAudio)
	{		
		theTxt.style.left = "9%";			
		theTxt.style.top = "39%";		
	}
}

fadePlayerOut = function()
{
	document.getElementById('outerLayer').style.overflow = 'hidden';
	$("#theBg").fadeOut(1000);
	$("#outerLayer").animate({"height" : "0%", "width": "0%"}, 500);
	$("#theBorder").fadeOut();
	$("#outerLayer").fadeOut();
	$("#theTxt").fadeOut();
	
	document.onclick = null;

	document.getElementById('theIFrame').innerHTML = "";		
}
displayInline = function(){
	theBorder.style.display = "inline";
	document.getElementById('outerLayer').style.display = 'inline';
	theBg.style.display = "inline";
}
displayNone = function()
{
	theBorder.style.display = "none";	
	theBg.style.display = "none";
}

function checkKey(e){
	if (e.keyCode == '27')
	{
		fadePlayerOut();

		if (jwpBoxPlayer != null)
			jwpBoxPlayer.stop();

		return !(e.keyCode == 27);
	}
}

function clickBtn(){
	theTxt.addEventListener('click',function()
	{
		fadePlayerOut();

		if (jwpBoxPlayer != null)		
			jwpBoxPlayer.stop();
	},false);
}
setupPlayer = function()
{
	var theContainer = document.createElement('div');
	theContainer.setAttribute('id','theContainer');
	document.getElementsByTagName('body')[0].appendChild(theContainer);
	document.getElementById('theContainer').innerHTML = '<div id="outerLayer"><div id="theJWPBoxPlayer"></div><div id="theIFrame" class="ifContainer"></div></div><style>.ifContainer {width: 100%; height: 0; padding-bottom: 56.25%;} .ifVideo {position: absolute; top: 0; left: 0; width: 100%; height: 100%;}</style>';
	var theBg = document.createElement('div');
	theBg.setAttribute('id','theBg');
	theContainer.appendChild(theBg); 
	theBg.style.width = '100%';
	theBg.style.height = '100%';
	theBg.style.overflow = "hidden";
	theBg.style.position = "fixed";
	theBg.style.top = "0px";
	theBg.style.left = "0px";
	theBg.style.margin = "0px";
	theBg.style.background = "#000000";
	theBg.style.opacity = "0.75";
	theBg.style.zIndex = "1998";
	theBg.style.display = "none";
	var theBorder = document.createElement('div');
	theBorder.setAttribute('id','theBorder');
	theContainer.appendChild(theBorder);
	theBorder.style.overflow = "hidden";
	theBorder.style.position = "fixed";
	theBorder.style.top = "8%";
	theBorder.style.left = "8%";
	theBorder.style.borderRadius = "25px";
	theBorder.style.boxShadow = "0px 0px 25px #000000";
	theBorder.style.margin = "0px";
	theBorder.style.background = "#EEEEEE";
	theBorder.style.zIndex = "1999";
	theBorder.style.display = "none";
	var theTxt = document.createElement('div');
	theTxt.setAttribute('id','theTxt');
	theBorder.appendChild(theTxt);
	theTxt.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA6CAYAAADspTpvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADVNJREFUeNrkWwlMVVcaPm/hwUNxQeOGFrWOtmIR0KpVsWoXtTqOS3TipKa1jlQ7M6YmrXWgO6nVuGudGE0MJtq0iSu2am3rMhqtRQWsGy44qCiooAg8ERDm/0/uefnveefce6XVdDIn+XPffe8u5zv//v/nMfZ/Nly/o/fV/68Cdik+uwhZga0n9EgW4lcDPnPmDHv66adlkG4C0K04l0edAUx35KDPnj1bD8N0I7z7sQKWOSjAechRkLt169Zh6enpPTww2rRp0+ny5csXb9++XZaamnoJfn9gAKwzPlOqk7kPC13/OAG7JG4K8lJat25d8pNPPjmkSZMmyeHh4T2sHlhXV1deVVV18s6dO//eu3fvtk8//TQfvq4lFAL+9OnT9d27d3/kgMU9lJsIMAzIl5GRMeipp576c1RU1BCv1xvdUNG5f//+pdLS0h3ffvvt2gULFlyBr2oMqpWAP5SeuxoA1qUAGr527drnExMT5/j9/kTTDa6He4Wso3BeB1zf8tVXX81btmxZAXxVbRDluGPQrgaIsNBJH9Lrr78e8+abb6Y3a9bsj05AlpSUcFB3795lTZs2ZT6fj4HIhwCVwYPIBwoLC5dPnjx5ZXFxccAAXaPQ8V8NWAbrNcD6ly5d2m/IkCH/CgsLa6sCWVZWxgoKClhRURG7evWq5ULAM1jnzp1Zq1atWIcOHRjovHIBKioqDrz33nspoOclKPkG8FqnoJ0CFvrKxRfBbtiwYVx8fPxCMLjhMmdPnjzJASLJHFeBppzEz3gNWl8weAwsu+kaPIJ+X/z666//On/+/DPwVZUBXIi4JWiXQ50VIszBfvfdd/9s377932RdRW6eOnXKxE35SK9X6GvIMS4ujiUkJLBGjRqZrn/w4EHZwYMHZ7z11lt74fSeAdqW0x6HYJGzEUCRmZmZ/4iNjZ0lg8jNzWV79uzhuqmbvI1xCjki3bhxgwc3LVq04DpPpCACRH8YqMCh/fv339REaY4BU2ssxDhy9erVo3r06DHXJbHrwIED7OjRoyFiqQOhIt11YKxYbW0ty8vLY40bN2YtW7akUuIDsU8G97ULfHIlic6E1XY9DGBhoDhYMBQJw4cPX+N2u4M6GwgE2DfffMPOnz/vxL1oLbEMULUQSPn5+XwhY2Jigr+Br2/aq1evnj/++ONOcF81JFqrd6rDgrsCrB9EOHrjxo27wHLGUh0EXcb4ln+WSVyj02E7w6UCLGjw4MGsZ8+epnuuXbu2ARiSBh8rDJ2uURkxjwO9bbR+/frU6OjoIXTiKMaot04B2Im0jsMqQk6jTiOJ54K494A5HoR5FUlcNnHabSHOXHfB0XcBizyZTjonJ4cdOXKET86OwJqajk4oIiJC+yxB27dvR67ShXWPGDECORxpeBSvlKUpAdOwkQcXkyZNmg5cDRNgb968yUWZvpwSBTdhwgSubzJ43aIg9evXj3322WfB++RnC6qpqWHHjh0ziT7E70nz5s0bbEhmGMnalBx2ETHn3B09enQHMPtjqDihNbbilpgchJzsxRdfZO+8804IaNUiCbBTpkxhkZGR7N133+X3qcAK+uWXX1h2drZJ3J999tmpBuBwA4uJwx6NKHPdTUtLexUinQHEMLAdO3ZodVbQtGnTWHJycjBk7NOnDztx4gQDK6rVywEDBrCpU6eaQs2+ffvy+yBn1i4wuixwlcH7QB3a3bp1azv47tuKBCOEw27K4Y4dO46kIoMhox2XKFgxkGPg1kycphzv37+/CSy9LzU1NYTD9L0XLlwIhrDGPN1jx479k8HhMMJlE2AaaPDkAEx8O3hhNwEWdQZXW6e7glS+lk4eDKDp+oEDB/JF0o1169YFOYmkAo/zokYVFvZ5A7CX6LFLxeFgjgsWrz99CEY6GDbqOCzoiy++YPv27dOCBjUJgkawKSkpWrArV65kEFBwoFY2AN0jlUSIu7t16tQpSrLWJh2mCQLX3zfeeOMvzZs3DxaMsrKy2JUrV7QBAiV0WZjmwUuVaeBzzz2HERJ77bXXtGBx4TA2F35Zp8NG9sS6deuGVloEOR5YiCOHDx++LKePXk0lIwxubk/BYRCPq0kjJwgzTREVjayWLVvGJzN06NAQMJj5oMvSjeXLl3OwVtGWHI0VFxeztm3bBp8BUtRRck18Yl7JRQVLN36/P0Y8DEGg/xWABShcYauwcunSpXxCL7zwguMSDy7UDz/8EBJ/47t0wHHg/CiDIOrqQCumMuCQWhWIXjQVXXQpMmAn8fPixYv5/eiT7caSJUs4WF0srQIsvisvLzc9C9xTc6K/QR1WcZgTjAi6Yvfu3VMCsjvHsXDhQq7T8fHxWrAQr7Ndu3ZZ5sZW5zg/eu7xeCKlGjnnsteizmwSEbSUD8tdcRw2bJglWBxjxozhCcnFixctOavjsjBgRCqV7R23rmAHAKvoQ9GqqlwC9Y/inP7+0ksv8TDRbmByv2jRIgbBjvI54lx+nyC0/nS+YLmrVD0tt24CVVVVd+gDcEIqsCrg4vPLL7/MIyynA9+Bhg7dmQzSLuBBH0/nW1lZWaZ6h1vXxQMjcJ2KDFg925fSyUGkxiMr3Th+/LgW9IoVK3jJVrWouvdibkwBg5u6pqpzuRXtSp48g1W+Th+AtSSnqw5RGnv//fe1YNPT09mMGTN4eUgHGqMsLNNaLSydCxpFqt8FBQWFdgWAOkqXLl06Q92SWHHdiwWNHDmSffTRR1qwn3zyCdu2bRu/9+OPP+aJvGpg1LRq1SoOWgYnzwGL9k888QQ1YNWwmOdJJzJYAXFLjWjxQy2kgdmUw1gYRz2xEuekpCQOSDc+/PBDtmXLFtMCffDBBywzM1MLetSoUbbFhl69epnEubS09BKIdCUJKeusOMzbk8eOHbtRVlZWIB6Cq9i7d29LwD/99BMHpBoo4ps3b1ZaX9T1rVu3htyDz/r8889t7QbmzRQwSOdRTYvVVABw07YnBivgO1tATNqTxsCYCdGAXvaJGClh3ksb1QgIwdJCHQ3+kTArovch2Dlz5oS8h96HR+wPoxQQH10HiccKSHSukwqm6DbWezT5MAddUlJSDq5lFAQPXBIge+IhJqygstIoJiNA42TQLVGwVvT999/z1PH06dNs9uzZSrDyd6+88gr33cLWQJJzCkLUjXCKLZCA0XsSGVMIYFrm8RUVFdVBKhcDJr+z4BaafxHvWsW2u3fv5mkiHp1WK8V9SKqyrfwZKyXjx483qcGmTZtW5eTkXICPGFxXGoBFgb7eY9Ps9kEWchNSvOFC37GXi8YES7V26RuWXpxw1q42rQKNAwuFGB+IAVPNS0tLy8BOrQFYbrIpC/EmwIWFhTUJCQnRrVu37iouQheFSTd2Hezi3IaSjrPifObMmabiHeru6tWrF507d+6yIc6Vsv6qqpZyXszFOzc39zIkAMk+n6+RuBhfho1ubJE64YzdgtgBpOfI2UGDBsnbp/ZALo2RzB2DuwFZnHUcljntqaioQN/2HzD//SFtDBMXd+nShVcNRfJtB062zLrvrIBPnDiRW2U6wFCdnzVr1uLq6upSg7uyda5z2i4VRswNaVslcLgUONtHtEv9fj9vbOHWBtFBdAK8If0l/G769OncKtMBSUIJ6O3c6zAMsHeJsRK+mFk103R9Ynd2dvYt0F8vhHGmzVGJiYk8MEFDZlWGaWgTDSM87GBg8Y8OCFruQ3Y1Pysr64IhyoK7VRJ36+04XK/babd///78uLi4xu3atfsDvQGrhpjWofjjYts1vp12CzHFBHHlhpIOEN9ARkbGCojFsw2wZUR3TZb5YbY8KEUd/PA5iLrKunbt+gyWRMWPsAjcmGBEJlozdoBVnEeNwfQS+0wIGFWHDljUW3Pnzp0P/jpXAkv9rnKDi8vB/g7RGEcUWPjFjRbNkCAz6pmSkvJ3mFCU6iFYx/7555+5qGPjy2ogKOwvYXSGyYDYzyEPcJNnIApbAYay2AArAFcQv/uA6K4jwNpNLZiuGqA5gSh3ePvtt18FkUvUPsiob2GigG4Mj1hHxvATdR/DSd1WCaKv1YcOHdqxYMGCTBDn2wbIMskq2+7kadC2JQM0crWJATxq3LhxCWPHjh0HiXjsb7m/GQMK8ABH16xZs+XEiRMFhugKa1wuBRg1dtuWHmZjGhVvv8HtKEIo8o0BdDyEogNjY2O7A/f8DQUKru5mXl5ezpdffrkHgoprBrAKA2S58TnwW29M0209DDdE3G8AFdTYWAj8LWLChAnPJCUlxUE20w0yrTZWL4G8tgb08goEMnk7d+7Mgnz8qgEkYJAAXEmM0yPZemi5uZQAj5SOogvvM2yAF/ypDzKcGAhgwkBvW+Tn5xcHAgHUzUJjwmKLcLUB5h4hAfweAfpINpc62j5MuB5BwJoAk8USz6ln5h3wtQSsoCrCzfuK7cP1TsH+1hvEfaRa4iPnYaSL55E68rSWJna+10icribcfOwbxJlFa8ZDwHsJV70SWLcG8AOJ0zXM5i8ArAH/eHmUf/KgAGVRpiItg3b0Jw/WwL/3/FeAAQDV0jZkwWDJvwAAAABJRU5ErkJggg%3D%3D" alt="close" width="25" height="25" />';
	theTxt.style.position = "fixed";
	theTxt.style.marginLeft = "1%";
	theTxt.style.marginTop = "1%";
	theTxt.style.cursor = "pointer";
	theTxt.style.zIndex = "9999999";

	document.getElementById('outerLayer').style.display = 'none';
	document.getElementById('outerLayer').style.position = 'fixed';
	document.getElementById('outerLayer').style.zIndex = '999999';

	document.getElementById('outerLayer').style.left = '0px';
	document.getElementById('outerLayer').style.top = '0px';

	document.getElementById('outerLayer').style.bottom = '0px';
	document.getElementById('outerLayer').style.right = '0px';
	document.getElementById('outerLayer').style.margin = 'auto';
	document.getElementById('outerLayer').style.overflow = 'hidden';

	if(!theclientHeight){
		$("#outerLayer").animate({"height" : "0%", "width": "0%"}, 500);
		$("#theTxt").fadeOut();
	}

	clickBtn();	
	
	document.onkeydown = checkKey;
}

function configVideo(theFile, theImg)
{
	jwpBoxPlayer = jwplayer("theJWPBoxPlayer");

	jwpBoxPlayer.setup(
	{
		file: theFile,
		image: theImg,
	    width: "100%",		
		height: "100%"
	});
}

function configAudio(theFile)
{
	jwpBoxPlayer = jwplayer("theJWPBoxPlayer");

	jwpBoxPlayer.setup(
	{
		file: theFile,		
	    width: "100%",		
		height: "30"		
	});
}

lightBoxItem = function(theFile, theImg, isVideo, isAudio, canDrag, canResize, iframe)
{
	if (iframe === undefined) 
	{
		if (isVideo)
			configVideo(theFile, theImg);

		if (isAudio)
			configAudio(theFile);

		document.getElementById('theIFrame').style.display = "none";
		document.getElementById('theJWPBoxPlayer').style.display = "";
	}
	else 
	{
		var e = document.getElementById('theIFrame');
		document.getElementById('theJWPBoxPlayer').style.display = "none";		

		e.style.display = "";

		e.innerHTML = iframe;
	}
	
	if (!iOSorAndroid && iframe === undefined)
		jwpBoxPlayer.play();

	if(theclientHeight)	
		displayInline();	
	else 	
		fadePlayerIn(isVideo, isAudio);	
	
	if (isMobile == false || !isSafari)
	{			
		if (iframe === undefined) 
		{
			jwpBoxPlayer.on('idle', function()
			{
				document.onclick = function(event){
					hasParent = false;
					if(hasParent){
						jwpBoxPlayer.play();
						fadePlayerIn(isVideo, isAudio);
					}
				}
			});
		}		
	}
	
	if (iframe === undefined) 
	{	
		jwpBoxPlayer.on('complete', function(){
			if(theclientHeight){
				displayNone();
			} else {
				fadePlayerOut();
			}
		});
	}
	
	if(canDrag && iframe === undefined)
	{	
		jwpBoxPlayer.on('ready', function()
		{                
			$.ui.plugin.add("draggable","alsoDrag",{start:function(){var a=$(this).data("ui-draggable"),o=a.options,t=function(a){$(a).each(function(){var a=$(this);a.data("ui-draggable-alsoDrag",{top:parseInt(a.css("top"),10),left:parseInt(a.css("left"),10)})})};"object"!=typeof o.alsoDrag||o.alsoDrag.parentNode?t(o.alsoDrag):o.alsoDrag.length?(o.alsoDrag=o.alsoDrag[0],t(o.alsoDrag)):$.each(o.alsoDrag,function(a){t(a)})},drag:function(){var a=$(this).data("ui-draggable"),o=a.options,t=(a.originalSize,a.originalPosition),s={top:a.position.top-t.top||0,left:a.position.left-t.left||0},i=function(a){$(a).each(function(){var a=$(this),o=$(this).data("ui-draggable-alsoDrag"),t={},i=["top","left"];$.each(i,function(a,i){var r=(o[i]||0)+(s[i]||0);t[i]=r||null}),a.css(t)})};"object"!=typeof o.alsoDrag||o.alsoDrag.nodeType?i(o.alsoDrag):$.each(o.alsoDrag,function(a,o){i(a,o)})},stop:function(){$(this).removeData("draggable-alsoDrag")}});
			$(function() 
			{
				$("#theBorder").draggable({alsoDrag: "#theJWPBoxPlayer,#theTxt"});
			});
			var getAll = function(t) 
			{
				return $('.group' + t.helper.attr('class').match(/group([0-9]+)/)[1]).not(t);
			};
		});	
	}

	if(canResize && iframe === undefined)
	{
		jwpBoxPlayer.on('ready', function()
		{			
			$(function() 
			{
				$("#theBorder").resizable({alsoResize: "#theJWPBoxPlayer"});
			});
		});			
	}	
}
