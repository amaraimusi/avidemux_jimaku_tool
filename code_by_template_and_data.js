/**
 * ひな形と行列データからコード群を生成
 * 
 * @version 1.1
 * @date 2016-1-8	改行にすきまを開けないようにする
 * @date 2015-11-24	新規作成
 */



function execution1(){

	var text = $('#pasting_csv').val();

	var ary = text.split(/\r\n|\r|\n/);
	
	
	var data=[];//埋め込みデータ
	for (var i=0;i<ary.length;i++){
		var row=ary[i];
		var dd=row.split(/\t/);
		data.push(dd);
		
	}
	

	var hina = $('#hina').val();
	var codes=[];
	for(var i=0;i<data.length;i++){
		var ent=data[i];
		var code=hina;
		for(var d=0;d<ent.length;d++){
			var str1=ent[d];
			var regexp = new RegExp('%' + d , 'g');
			code=code.replace(regexp,str1);
		}
		code=sanitize_str(code);//サニタイズ
		codes.push(code);
		
	}
	
	var res=codes.join('<br>');
	$('#res').html(res);

}


/**
 * 一般用のサニタイズ
 */
function sanitize_str(str) {


	//記号「;&<>",」をサニタイズ
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/\t/g, '&#x0009;');
    str = str.replace(/\r\n|\r|\n/g, '<br>');

    return str;
}
