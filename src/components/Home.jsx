import Products from './Products';

const Home = ({ filteredData }) => {
  return (
    <>
        <div className='w-10/12 p-10'>
          <Products filteredData={filteredData} />
        </div>
    </>
  )
}

export default Home
