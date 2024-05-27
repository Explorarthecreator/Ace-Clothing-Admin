

function ProductItem({data,openModal, id}) {
  return (
    <div className=" card card-compact bg-white w-full md:w-60 xl:w-64 shadow-xl">
        <div className="card-body flex-row">
            <div className="w-11/12">
              <h2 className=" card-title text-lg">
                {
                    data.name
                }
              </h2>
              <div className="flex">
                <p>
                  Tag: <span className="text-success">{data.tag}</span>
                </p>
              </div>
            </div>
            <div className=" flex items-center gap-3">
              <p className="link" onClick={()=>openModal(data,id)}>
                View
              </p>
            </div>
        </div>
    </div>
  )
}

export default ProductItem