/*
/!**
 * export2Excel(columns,list,[name]) 导出excel表格
 *  columns Array = [{},{}] 表头 = [{title:'',key:''}]
 *  list = [] table的数据 [{},{}]
 *  name可加，则保存时的名字 ，不加可写死
 * *!/
export function export2Excel(columns,list){
    require.ensure([],() => {
        const { export_json_to_excel } = require('../../excel/Export2Excel');
        let tHeader = []
        let filterVal = []
        console.log(columns)
        if (!columns){
            return;
        }
        columns.forEach(item=>{
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v=>filterVal.map(j=>v[j]))
        export_json_to_excel(tHeader,data,'数据列表');
    })
}*/
import nanoid from 'nanoid'
export function export2Excel() {
    require.ensure([], () => {
        // eslint-disable-next-line camelcase
        const {export_json_to_excel} = require('../../excel/Export2Excel')
        const tHeader = ['姓名'] // 列头
        const filterVal = ['Name'] // 内容
        const list = [{'Name': 'zs'}]
        const data = formatJson(filterVal, list)  // list是你的数据源，可以自己重新处理数据内容和类型

        export_json_to_excel(tHeader, data, nanoid)
    })
}

function formatJson(filterVal,jsonData){
    return jsonData.map((v, index, arr) =>
        filterVal.map(j => {
            console.log(v,index,arr)
            return v[j]
        })
    )
}