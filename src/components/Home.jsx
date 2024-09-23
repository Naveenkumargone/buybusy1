import Products from './Products';

const Home = ({ data }) => {

  console.log(data)
  return (
    <>
      <div className='w-10/12 p-10'>
        <Products data={data} />
      </div>
    </>

  )
}

export default Home
