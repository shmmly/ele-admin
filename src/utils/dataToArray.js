/**
 * 将数据转化为array
 *  这里对象添加属性和合并数组采用es6的写法
 *  如果用什么不懂得可以参考
 *  #link http://es6.ruanyifeng.com'
 */
export default function dataToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(record => {
    if (record._expanded === undefined) {
      record = {...record, _expanded: expandAll}
    }
    let _level = 1
    if (!!level) {
      _level = level + 1
    }
    record = {...record, _level: _level}
    //  如果有父级元素
    if (parent) {
      record = {...record, parent: parent}
    }
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = dataToArray(record.children, expandAll, record, _level)
      tmp = [...tmp, ...children]
    }
  })
  return tmp
}

