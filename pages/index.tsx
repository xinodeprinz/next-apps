import Image from "next/image"
import Link from "next/link"

const Read = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2 className="text-capitalize text-decoration-underline text-primary">Our Products</h2>
        <Link href={'/create'} className="btn btn-dark">Create Product</Link>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i}>
              <td>{i}</td>
              <td>
                <Image
                  src={'/test.png'}
                  width={100}
                  height={50}
                  alt={'Test image'}
                />
              </td>
              <td>Beautiful forest</td>
              <td>$300</td>
              <td>
                <Link href={`update/${1}`} className="btn btn-primary">Update</Link>
                <button className="btn btn-danger ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Read