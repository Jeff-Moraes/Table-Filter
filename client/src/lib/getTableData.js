import axios from 'axios';

const getTableData = async () => {
  try {
    const { data } = await axios.get('/data/table_data.json');

    return data;
    
  } catch (error) {
    console.log(error);
  }
}

export default getTableData;