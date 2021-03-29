/**
 * Avidemux字幕入力ツール
 * 
 * @version 1.0.0
 * @date 2021-3-27
 */

var vueApp;
$(()=>{
	vueApp = new Vue({
		el: '#vue_app',
		data: {
			start_datetime: '00:00:10', // 字幕開始時間
			display_time: 4.5, // 表示時間（秒）
			interval: 0.2, // 時間間隔(秒）
			row_count: 2, // 字幕行数
			data_text: '水槽を畑に植えている。\nI Planting fish tank.\nこれらの水槽は私の家族から追い出された。\nMy family said "Throw away the aquarium! "\n難民水槽である。\nWhat did my aquarium do! ..so put to the field.', // データテキスト
			res:'',
		}
	})
});


function execution1(){
	
	let start_datetime = vueApp.start_datetime; // 字幕開始時間
	let display_time = vueApp.display_time; // 表示時間（秒）
	let interval = vueApp.interval; // 時間間隔(秒）
	let row_count = vueApp.row_count; // 字幕行数
	let data_text = vueApp.data_text; // データテキスト
	
	display_time = display_time * 1;
	display_time = display_time.toFixed(3); // 小数点以下3桁まで
	interval = interval * 1;
	interval = interval.toFixed(3); // 小数点以下3桁まで

	let startDt = DateParse(start_datetime, 'hh:ii:ss');
	let u = Math.floor(startDt);// UNIXタイムスタンプに変換(ミリ秒単位)
	
	let ary = data_text.split(/\r\n|\r|\n/);
	
	let output = '';
	let i2 = 0;
	let index = 0;
	
	for(let i in ary){
		let line = ary[i];
		if(i2==0){
			index ++;
			output += '\n' + index;
			
			let u1 = u + (interval * 1000);
			let time_str1 = convFormatWithMillisecond(u1);
			
			let u2 = u + (display_time * 1000);
			let time_str2 = convFormatWithMillisecond(u2);
			
			// 00:00:20,000 --> 00:00:24,000
			let time_line = time_str1 + ' --> ' + time_str2;
			output += '\n' + time_line;
			
			u += (display_time * 1000);
		}
		output += '\n' + line;
		
		i2++;
		if(i2 == row_count){
			output += '\n';
			i2 = 0;
		} 
		
	}
	
	vueApp.res = output;

}

	
/**
 * ミリ秒を含むUNIXタイプスタンプから「hh:ii:ss,xxx」形式に変換する
 */
function convFormatWithMillisecond(u){
	let d2 = new Date(u); // UNIXタイムスタンプからDateに変換
	let str_time = DateFormat(d2, 'hh:ii:ss');
	let mod = u % 1000;
	let few = ( '000' + mod ).slice( -3 ); // 0を付け足して3桁にする。
	let str_time2 = str_time + ',' + few;
	return str_time2;
}

	/**
	 * 日付オブジェクトから文字列に変換します
	 * 
	 * @param date 対象の日付オブジェクト
	 * @param format フォーマット
	 * @return フォーマット後の文字列
	 * @date 2012/06/10 新規作成
	 */
	function DateFormat(date, format){

		if (format==null) format ='yyyy-mm-dd hh:ii:ss';
		
		var result = format;

		var f;
		var rep;

		var yobi = new Array('日', '月', '火', '水', '木', '金', '土');

		f = 'yyyy';
		if ( result.indexOf(f) > -1 ) {
			rep = date.getFullYear();
			result = result.replace(/yyyy/, rep);
		}

		f = 'mm';
		if ( result.indexOf(f) > -1 ) {
			rep = PadZero(date.getMonth() + 1, 2);
			result = result.replace(/mm/, rep);
		}

		f = 'ddd';
		if ( result.indexOf(f) > -1 ) {
			rep = yobi[date.getDay()];
			result = result.replace(/ddd/, rep);
		}

		f = 'dd';
		if ( result.indexOf(f) > -1 ) {
			rep = PadZero(date.getDate(), 2);
			result = result.replace(/dd/, rep);
		}

		f = 'hh';
		if ( result.indexOf(f) > -1 ) {
			rep = PadZero(date.getHours(), 2);
			result = result.replace(/hh/, rep);
		}

		f = 'ii';
		if ( result.indexOf(f) > -1 ) {
			rep = PadZero(date.getMinutes(), 2);
			result = result.replace(/ii/, rep);
		}

		f = 'ss';
		if ( result.indexOf(f) > -1 ) {
			rep = PadZero(date.getSeconds(), 2);
			result = result.replace(/ss/, rep);
		}

		f = 'fff';
		if ( result.indexOf(f) > -1 ) {
			rep = PadZero(date.getMilliseconds(), 3);
			result = result.replace(/fff/, rep);
		}

		return result;

	}


	/**
	 * 文字列から日付オブジェクトに変換します
	 * 
	 * @param date 対象の日付オブジェクト
	 * @param format フォーマット
	 * @return 変換後の日付オブジェクト
	 * 
	 * @date 2012/06/10 新規作成
	 */
	function DateParse(date, format){
		
		if (format==null) format ='yyyy-mm-dd hh:ii:ss';
		
		var year = '1990';
		var month = '01';
		var day = '01';
		var hour = '00';
		var minute = '00';
		var second = '00';
		var millisecond = '000';

		var f;
		var idx;

		f = 'yyyy';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			year = date.substr(idx, f.length);
		}

		f = 'mm';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			month = parseInt(date.substr(idx, f.length), 10) - 1;
		}

		f = 'dd';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			day = date.substr(idx, f.length);
		}

		f = 'hh';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			hour = date.substr(idx, f.length);
		}

		f = 'ii';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			minute = date.substr(idx, f.length);
		}

		f = 'ss';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			second = date.substr(idx, f.length);
		}

		f = 'fff';
		idx = format.indexOf(f);
		if ( idx > -1 ) {
			millisecond = date.substr(idx, f.length);
		}

		var result = new Date(year, month, day, hour, minute, second, millisecond);

		return result;

	}


	/**
	 * ゼロパディングを行います
	 * @param value	対象の文字列
	 * @param length	長さ
	 * @return 結果文字列
	 * 
	 */
	function PadZero(value, length){
	    return new Array(length - ('' + value).length + 1).join('0') + value;
	}


