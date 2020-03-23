// JavaScript Document
// 计算 Empirical P-Value
function empirical_p(gene1,gene2,datas,groups,total){
	var count = new Array(groups.length+1).fill(0);
	var totals = new Array();
	// 重复1000次
	for(var m=0;m<1000;m++){
		//计算随机排列后的data与group
		var data = new Array();
		var group = new Array();
		//得到新的gene1/gene2随机排列后的数组
		var newGene1 = randomJson(gene1);
		var newGene2 = randomJson(gene2);
		//console.log(newGene1);
		var num = 0;
		for(var i=0;i<datas.length;i++){
			data[i] = new Array();
			for(var j=0;j<datas[i].length;j = j+2){
				data[i].push(newGene1[num]);
				data[i].push(newGene2[num]);
				num++;
			}
		}
		//获得pvalue等值
		getCorrelationCoefficientAndSetGroups (data,group,totals);
		for(var i=0;i<groups.length;i++){
			if(makeNumberToStringAndExponential(groups[i][3])<makeNumberToStringAndExponential(group[i][3])){
				count[i]++;
			}
		}
		//将pvalue的值转换成字符串进行比较
		if(makeNumberToStringAndExponential(total[0])<makeNumberToStringAndExponential(totals[m])){
			count[groups.length]++;
		}
	}
	for(var i=0;i<groups.length;i++){
		count[i]=count[i]/1000.0;
		console.log(count[i]);
		groups[i].push(count[i]);
	}
	total.push(count[groups.length]/1000.0);
}
// 随机排列数组内的数据
function randomJson(arr){
	for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
	return arr;
}