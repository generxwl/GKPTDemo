
/*
 * 转换时间格式
 */
 function convertTimeFormat(time) 
 {
   if (time != null) 
   {
	time = time.replace("-", "/");
	time = time.replace("-", "/");
	return new Date(time);
   }
   return null;
}

/**
 * 替换字符串
 * @param {Object} str  字符串
 * @param {Object} parms1 需要替换的字符串
 * @param {Object} parms2 替换后的字符串
 */
function replace(str,parms1,parms2){
	return str.replace(eval("/"+parms1+"/g"),parms2);
}
/*
* 格式化无效字符
*/
function formatStr(str) 
{
	if (str == null) 
	{
		return '无';
	} 
	else 
	{
		return str;
	}
}
/**
 * 获取风向
 */
function getWindDirectionStr(wd)
{
    var wdstr = '';
    if(wd==null)
    {
        wdstr = '-';
    }
    else if(wd<=22.5 || wd>=337.5)
    {
        wdstr = '北风';
    }
    else if(wd>22.5 && wd<=67.5)
    {
        wdstr = '东北风';
    }
    else if(wd>67.5 && wd<=112.5)
    {
        wdstr = '东风';
    }
    else if(wd>112.5 && wd<=157.5)
    {
        wdstr = '东南风';
    }
    else if(wd>157.5 && wd<=202.5)
    {
        wdstr = '南风';
    }
    else if(wd>202.5 && wd<=247.5)
    {
        wdstr = '西南风';
    }
    else if(wd>247.5 && wd<=292.5)
    {
        wdstr = '西风';
    }
    else if(wd>292.5 && wd<=337.5)
    {
        wdstr = '西北风';
    }
    return wdstr;
  }
/*
* 
*/
function getWindLevelByStr(wd)
{
    var wid = 0;
    switch(wd)
    {
        case '北风':wid = 0;break;
        case '东北风':wid = 1;break;
        case '东风':wid = 2;break;
        case '东南风':wid = 3;break;
        case '南风':wid = 4;break;
        case '西南风':wid = 5;break;
        case '西风':wid = 6;break;
        case '西北风':wid = 7;break;
    }
    return wid;
}

function toRad(d) 
{  
	return d * Math.PI / 180; 
}

/**
* 计算距离
* lat为纬度, lng为经度
*/
function getDisance(lat1, lng1, lat2, lng2) { 
    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
}

/*
* 根据风速得到风力等级
*/
function getWindLevel(speed) {
	if (speed < 1) {
		return 0;
	} else if (speed >= 1 && speed <= 5) {
		return 1;
	} else if (speed >= 6 && speed <= 11) {
		return 2;
	} else if (speed >= 12 && speed <= 19) {
		return 3;
	} else if (speed >= 20 && speed <= 28) {
		return 4;
	} else if (speed >= 29 && speed <= 38) {
		return 5;
	} else if (speed >= 39 && speed <= 49) {
		return 6;
	} else if (speed >= 50 && speed <= 61) {
		return 7;
	} else if (speed >= 62 && speed <= 74) {
		return 8;
	} else if (speed >= 75 && speed <= 88) {
		return 9;
	} else if (speed >= 89 && speed <= 102) {
		return 10;
	} else if (speed >= 103 && speed <= 117) {
		return 11;
	} else if (speed > 117) {
		return 12;
	}
}

/*
* 根据aqi得到对应颜色
*/
function getAQIColor(aqi) {
	if (aqi <= 0) {
		color = "#f0f0f0";
	} else if (aqi <= 50) {
		color = "#43ce17";
	} else if (aqi <= 100) {
		color = "#efdc31";
	} else if (aqi <= 150) {
		color = "#fa0";
	} else if (aqi <= 200) {
		color = "#ff401a";
	} else if (aqi <= 300) {
		color = "#d20040";
	} else {
		color = "#9c0a4e";
	}
	return color;
}

/*
* 根据aqi得到污染等级
*/
function getAQIlevel(aqi) {
	if (aqi <= 0) {
		color = "无";
	} else if (aqi <= 50) {
		color = "优";
	} else if (aqi <= 100) {
		color = "良";
	} else if (aqi <= 150) {
		color = "轻度";
	} else if (aqi <= 200) {
		color = "中度";
	} else if (aqi <= 300) {
		color = "重度";
	} else {
		color = "严重";
	}
	return color;
}

/*
*根据aqi得到按钮样式
*/
function getAQIStyle(aqi) {
	if (aqi <= 0 || aqi == null || aqi == '') {
		styles = 'background-color:#6E6E6E;color:white;';
	} else if (aqi <= 50) {
		styles = 'background-color:#43ce17;color:white;';
	} else if (aqi <= 100) {
		styles = 'background-color:#efdc31;color:white;';
	} else if (aqi <= 150) {
		styles = 'background-color:#fa0;color:white;';
	} else if (aqi <= 200) {
		styles = 'background-color:#ff401a;color:white;';
	} else if (aqi <= 300) {
		styles = 'background-color:#d20040;color:white;';
	} else {
		styles = 'background-color:#9c0a4e;color:white;';
	}
	return styles;
}

/*
* 根据AQI获取污染等级
*/
function getAQILevelIndex(aqi) {
	var level = 0;
	if (aqi <= 0 || aqi == null || typeof aqi == 'undefined') {
		level = 0;
	} else if (aqi <= 50) {
		level = 1;
	} else if (aqi <= 100) {
		level = 2;
	} else if (aqi <= 150) {
		level = 3;
	} else if (aqi <= 200) {
		level = 4;
	} else if (aqi <= 300) {
		level = 5;
	} else {
		level = 6;
	}
	return level;
}

/*
* 根据等级获取颜色
*/
function getColorByIndex(level) {
	var color = '#6E6E6E';
	if (level == 0) {
		color = "#6E6E6E";
	} else if (level == 1) {
		color = "#43ce17";
	} else if (level == 2) {
		color = "#efdc31";
	} else if (level == 3) {
		color = "#fa0";
	} else if (level == 4) {
		color = "#ff401a";
	} else if (level == 5) {
		color = "#d20040";
	} else {
		color = "#9c0a4e";
	}
	return color;
}

/* 
 * 根据综合指数得到对应污染等级
*/
function getComplexIndexLevelIndex(complexindex) {
	if (complexindex <= 5) {
	    level = 1;
	} else if (complexindex <= 6) {
	    level = 2;
	} else if (complexindex <= 8) {
	    level = 3;
	} else if (complexindex <= 9) {
	    level = 4;
	} else if (complexindex <= 10) {
	    level = 5;
	} else {
	    level = 6;
	}
	return level;
}

/*
* 根据pm2.5得到对应污染等级
*/
function getPM25LevelIndex(pm2_5) {
	var level;
	if(pm2_5==0){
		level = 0;
	}else if (pm2_5 <= 35) {
		level = 1;
	} else if (pm2_5 <= 75) {
		level = 2;
	} else if (pm2_5 <= 115) {
		level = 3;
	} else if (pm2_5 <= 150) {
		level = 4;
	} else if (pm2_5 <= 250) {
		level = 5;
	} else {
		level = 6;
	}
	return level;
}

/*
*根据pm10得到对应污染等级
*/
function getPM10LevelIndex(pm10) {
	var level;
	if(pm10==0){
		level = 0;
	}else if (pm10 <= 50) {
		level = 1;
	} else if (pm10 <= 150) {
		level = 2;
	} else if (pm10 <= 250) {
		level = 3;
	} else if (pm10 <= 350) {
		level = 4;
	} else if (pm10 <= 420) {
		level = 5;
	} else {
		level = 6;
	}
	return level;
}

/**
 *根据so2得到对应污染等级
 */
 function getSO2LevelIndex(so2, type) {
   var level;
   if (type == 'day') {
	   if(so2==0 || so2 == null || typeof so2 == 'undefined'){
			level = 0;
		}else if (so2 <= 50) {
	    level = 1;
	    } else if (so2 <= 150) {
	    level = 2;
	    } else if (so2 <= 475) {
	    level = 3;
	    } else if (so2 <= 800) {
	    level = 4;
	    } else {
	    level = 5;
	    }       
   } else {
	   if(so2==0 || so2 == null || typeof so2 == 'undefined'){
			level = 0;
		}else if (so2 <= 150) {
	    level = 1;
	    } else if (so2 <= 500) {
	    level = 2;
	    } else if (so2 <= 650) {
	    level = 3;
	    } else if (so2 <= 800) {
	    level = 4;
	    } else {
	    level = 5;
	    }   	
   }

    return level;
}

/**
*根据no2得到对应污染等级
*/
function getNO2LevelIndex(no2, type) {
	var level;
	if (type == 'day') {
		if(no2==0 || no2 == null || typeof no2 == 'undefined'){
			level = 0;
		}else if (no2 <= 40) {
			level = 1;
		} else if (no2 <= 80) {
			level = 2;
		} else if (no2 <= 180) {
			level = 3;
		} else if (no2 <= 280) {
			level = 4;
		} else if (no2 <= 565) {
			level = 5;
		} else {
			level = 6;
		}
	} else {
		if(no2==0 || no2 == null || typeof no2 == 'undefined'){
			level = 0;
		}else if (no2 <= 100) {
			level = 1;
		} else if (no2 <= 200) {
			level = 2;
		} else if (no2 <= 700) {
			level = 3;
		} else if (no2 <= 1200) {
			level = 4;
		} else if (no2 <= 2340) {
			level = 5;
		} else {
			level = 6;
		}		
	}

	return level;
}

/**
* 根据o3得到对应污染等级
*/
function getO3LevelIndex(o3, type) {
	var level;
	if (type == 'day') {
		if(o3==0 || o3 == null || typeof o3 == 'undefined'){
			level = 0;
		}else if (o3 <= 100) {
			level = 1;
		} else if (o3 <= 160) {
			level = 2;
		} else if (o3 <= 215) {
			level = 3;
		} else if (o3 <= 265) {
			level = 4;
		} else if (o3 <= 800) {
			level = 5;
		} else {
			level = 6;
		}
	} else {
		if(o3==0 || o3 == null || typeof o3 == 'undefined'){
			level = 0;
		}else if (o3 <= 160) {
			level = 1;
		} else if (o3 <= 200) {
			level = 2;
		} else if (o3 <= 300) {
			level = 3;
		} else if (o3 <= 400) {
			level = 4;
		} else if (o3 <= 800) {
			level = 5;
		} else {
			level = 6;
		}		
	}
	return level;
}

/**
* 根据co得到对应污染等级
*/
function getCOLevelIndex(co, type) {
	var level;
	if (type == 'day') {
		if(co==0 || co == null || typeof co == 'undefined'){
			level = 0;
		}else if (co <= 2) {
			level = 1;
		} else if (co <= 4) {
			level = 2;
		} else if (co <= 14) {
			level = 3;
		} else if (co <= 24) {
			level = 4;
		} else if (co <= 36) {
			level = 5;
		} else {
			level = 6;
		}
	} else {
		if(co==0 || co == null || typeof co == 'undefined'){
			level = 0;
		}else if (co <= 5) {
			level = 1;
		} else if (co <= 10) {
			level = 2;
		} else if (co <= 35) {
			level = 3;
		} else if (co <= 60) {
			level = 4;
		} else if (co <= 90) {
			level = 5;
		} else {
			level = 6;
		}
	}

	return level;
}

/**
 * 计算综合指数
 * @param so2
 * @param no2
 * @param co
 * @param o3
 * @param pm10
 * @param pm2_5
 * @returns {number}
 */
function getIndex(so2,no2,co,o3,pm10,pm2_5){
	return so2/60 + no2/40 + co/4 + o3/160 + pm10/70 + pm2_5/35;
}
//解决排名bug
function fixSortBugFun(data,id)
			 {
			 	$.each(data,function(index,obj){
			 		if(obj.rankIndexForSort<0)
			 		{
			 			var rankIndexForSort=$("#"+id+" tbody tr:eq("+(index-1)+") td:eq(0)").text();
			 			$("#"+id+" tbody tr:eq("+index+") td:eq(0)").text(rankIndexForSort);
			 			obj.rankIndexForSort=0;
			 		}
			 	});
			 } 