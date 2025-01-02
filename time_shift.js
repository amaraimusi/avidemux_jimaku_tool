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
			shift_sec: 10, // ずらし秒
			data_text: '1\n00:16:10,200 --> 00:16:15,000\nプチ家出してた先住猫のエビー。\n\n2\n00:16:15,200 --> 00:16:20,000\n夜に帰ってきました。\n\n1\n00:16:26,200 --> 00:16:31,000\n外は寒かったせいか\n\n2\n00:16:31,200 --> 00:16:36,000\n今日の怒りの表明は控えめです。\n\n1\n00:16:45,200 --> 00:16:50,000\nいつも機嫌が悪いエビーを\n\n2\n00:16:50,200 --> 00:16:55,000\n冷やかすように近づくニョッキ。\n\n1\n00:17:06,200 --> 00:17:11,000\n夜も更けてきました。\n\n2\n00:17:11,200 --> 00:17:16,000\n寒い冬をゆっくり くつろぐ猫たち。\n\n1\n00:17:17,200 --> 00:17:22,000\n翌朝。\n\n1\n00:17:26,200 --> 00:17:31,000\nとりあえず脱走を試みるニョッキを押し返します。\n\n2\n00:17:31,200 --> 00:17:36,000\nポポンは、また、転がり歓迎してくれました。\n\n1\n00:17:43,200 --> 00:17:48,000\n問題の古株猫のエビー。\n\n2\n00:17:48,200 --> 00:17:53,000\n外に出せと早朝から騒いでいました。\n\n3\n00:17:53,200 --> 00:17:58,000\n情緒不安定な様子で部屋の外を伺います。\n\n4\n00:17:58,200 --> 00:18:03,000\nエサを食べるか、外に出るかで迷うエビー。\n\n1\n00:18:08,200 --> 00:18:13,000\nエビーはエサの時間になっても降りてきません。\n\n2\n00:18:13,200 --> 00:18:18,000\n外に出たがっていますが、エサも気になる様子。\n\n3\n00:18:18,200 --> 00:18:23,000\nどうしたものかと、エサを食べる若猫たちと\n部屋の外を見比べます。\n\n1\n00:18:35,200 --> 00:18:40,000\nニョッキは脱走する隙を狙ってるようです。\n\n1\n00:18:48,200 --> 00:18:53,000\n外に出られず不機嫌なエビー。', // データテキスト
			res:'',
			err_msg:'',
		}
	})
});


function execution1(){
	
	let shift_sec = vueApp.shift_sec; // ずらし秒
	let data_text = vueApp.data_text; // 字幕データテキスト（str形式の動画の字幕）
	
	/*
	
data_textのデータ例 str
1
00:16:10,200 --> 00:16:15,000
プチ家出してた先住猫のエビー。

2
00:16:15,200 --> 00:16:20,000
夜に帰ってきました。

	*/
	
	
	let ary = data_text.split(/\r\n|\r|\n/);
	
	let output = '';
	let err_msg = '';

    try {
        ary.forEach((line, index) => {
            // 時刻行を検出
            if (line.includes('-->')) {
                const [start, end] = line.split(' --> ');

				
                const newStart = addSecondsToTimestamp(start, shift_sec);
                const newEnd = addSecondsToTimestamp(end, shift_sec);
                output += `${newStart} --> ${newEnd}\n`;
            } else {
                output += `${line}\n`;
            }
        });
    } catch (error) {
        err_msg = `エラーが発生しました: ${error.message}`;
    }
	
	
	vueApp.err_msg = err_msg;
	vueApp.res = output;
	
}

// 時刻計算ツール
function addSecondsToTimestamp(timestamp, secondsToAdd) {
    // 時刻をパース
    const timeParts = timestamp.split(/[:,]/); // 時間、分、秒、ミリ秒を分割
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    const milliseconds = parseInt(timeParts[3], 10);

    // 現在の時刻をミリ秒に変換
    let totalMilliseconds = 
        (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;

    // 加算する時間をミリ秒に変換して加算
    totalMilliseconds += secondsToAdd * 1000;

    // ミリ秒を新しい時刻に変換
    const newHours = Math.floor(totalMilliseconds / 3600000);
    totalMilliseconds %= 3600000;
    const newMinutes = Math.floor(totalMilliseconds / 60000);
    totalMilliseconds %= 60000;
    const newSeconds = Math.floor(totalMilliseconds / 1000);
    const newMilliseconds = totalMilliseconds % 1000;

    // 時刻をフォーマット/
	
	const formattedTime = 
		String(newHours).padStart(2, '0') + ':' +
		String(newMinutes).padStart(2, '0') + ':' +
		String(newSeconds).padStart(2, '0') + ',' +
		String(newMilliseconds).padStart(3, '0');

    return formattedTime;
}


