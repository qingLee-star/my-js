// 请对以下数据去重
/* [
  {status: 0, ids: [11, 12, 14, 15]},
  {status: 1, ids: [12, 13, 16, 15]},
  {status: 0, ids: [16, 17, 18, 15, 14]},
  {status: 2, ids: [12, 19, 20, 21]},
  {status: 1, ids: [22, 23, 24, 13, 15]},
  {status: 2, ids: [12, 26, 19, 27]}
] */

// 期望得到数据
/* [
	{status: 0, ids: [11, 12, 14, 15, 16, 17, 18]},
	{status: 1, ids: [12, 13, 16, 15, 22, 23, 24]},
	{status: 2, ids: [12, 19, 20, 21, 26, 27]}
] */

var arr = [
	{ status: 0, ids: [11, 12, 14, 15] },
	{ status: 1, ids: [12, 13, 16, 15] },
	{ status: 0, ids: [16, 17, 18, 15, 14] },
	{ status: 2, ids: [12, 19, 20, 21] },
	{ status: 1, ids: [22, 23, 24, 13, 15] },
	{ status: 2, ids: [12, 26, 19, 27] }
]

// 方式一
/* const arr1 = []
JSON.parse(JSON.stringify(arr)).forEach(row => {
	const newRow = arr1.find(v => v.status === row.status)
	if (newRow) {
		newRow.ids = Array.from(new Set([...row.ids, ...newRow.ids]))
	} else {
		arr1.push(row)
	}
}) */

// 方式二,与上面方式几乎相同
/* let arr1 = arr.reduce((a, b) => {
	let findIndex = a.findIndex((item) => item.status === b.status);
	if (findIndex > -1) {
			a[findIndex].ids = [...new Set(a[findIndex].ids.concat(b.ids))];
	} else {
			a.push(b);
	}
	return a;
}, []); */

// 方式三
const map = {};
arr.forEach(({status, ids}) => {
  map[status] = Array.from(new Set([...(map[status] || []), ...ids]));
})
// 先生成 {0: [12,13,14], 1: [14,15,16]} 这样的对象，再取key和value
const arr1 = Object.keys(map).map(key => (
  {
    status: key,
    ids: map[key]
  }
));
console.log('新数组: ', arr1);
