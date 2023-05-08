import Image from "next/image"

const Form = ({ isCreate = true }) => {
    const handlePhoto = (e: Event) => {
        const photo = ((e.target as HTMLInputElement).files as FileList)[0];
        console.log(photo);
        const previewImage = document.getElementById('preview');
        previewImage.src = URL.createObjectURL(photo);
    }
    return (
        <div className="container mt-5">
            <h2 className="text-capitalize text-decoration-underline text-primary mb-4">
                {isCreate ? 'Create' : 'Upadte'} Product
            </h2>
            <form>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="mb-3">
                            <input type="text" placeholder="Title" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <input type="number" placeholder="Price" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" placeholder="Description" cols={30} rows={10} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Image
                            src={'/test.png'}
                            width={100}
                            height={200}
                            alt={"Hello"}
                            id="preview"
                        />
                        <input type="file" onChange={handlePhoto} id="photo" hidden />
                        <button
                            type="button"
                            onClick={() => document.getElementById('photo')?.click()}
                            className="btn btn-dark d-block"
                        >
                            Upload Photo
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    {isCreate ? 'Create' : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default Form