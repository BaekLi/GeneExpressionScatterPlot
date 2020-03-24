// JavaScript Document
// 计算 Empirical P-Value
function empirical_p(gene1,gene2,datas,groups,totals){
	var count = new Array(groups.length+1).fill(0);
	var total = new Array();
	console.log(totals);
	// 随机重复1000-10000次
	var xun = 1000+ Math.floor(Math.random()*9001);
	for(var m = 0;m<xun ;m++){
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
		//获得相关系数等值
		getCorrelationCoefficientAndSetGroups (data,group,total);
		for(var k=0;k<count.length-1;k++){
			// 比较的相关系数是绝对值
			if(group[k][1]>groups[k][1]){
				count[k]++;
			}
			//比较的是非绝对值的相关系数 k<count.length
//			if(total[k]>totals[k]){
//				count[k]++;
//			}
		}
		if(total[m]>totals[0]){
			count[groups.length]++;
		}
	}
	for(var i=0;i<groups.length;i++){
		count[i]=count[i]/xun;
		groups[i].push(count[i]);
	}
	totals.push(count[groups.length]/xun);
}
// 随机排列数组内的数据
function randomJson(arr){
	for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
	return arr;
}
