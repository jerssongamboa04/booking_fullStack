


const fetchData = async (url, options = {}) => {
    const response = await fetch(url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body || null,
    });

    return response.json();
};



const promiseAll = async (array) => {
    const data = await Promise.all(array.map(element => fetchData(element.url)))
    return data
}


export {
    fetchData,
    promiseAll
}