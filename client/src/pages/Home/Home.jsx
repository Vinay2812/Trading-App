import Navbar from '../../components/Navbar/Navbar';
import PublishedList from '../../components/PublishedList/PublishedList';

function Home() {
  return (
    <>
      <Navbar />
      <div className="page">
        <PublishedList isPublishedList={false}/>
      </div>
    </>
  )
}

export default Home