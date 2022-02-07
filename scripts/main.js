
async function getData(jsonPath){
    const res = await fetch(jsonPath);
    const data = await res.json();
    return(data);
}

/*
CONTAINER_ID = id del container in cui ci vanno gli articoli / repo / guide
idPrefix = prefisso dell'id. Es: repoNo1 oppure articleNo1 ...
linkText = "null" se si vuole che testo e link siano uguali. Altrimenti specificare un testo
*/
async function fillContainer(JSON_FILE_PATH,CONTAINER_ID,idPrefix, linkText=null)
{
    const container = document.getElementById(CONTAINER_ID);
    const jsonData = await getData(JSON_FILE_PATH);

    jsonData.forEach(item => {
		const divRow = document.createElement('div');
		const divColMD8 = document.createElement('div');
		const art = document.createElement('article');
		const p_artTitle = document.createElement('p');
		const p_artDesc = document.createElement('p');
		const repoLink = document.createElement('a');

		divRow.classList.add('row');
		divRow.classList.add('justify-content-md-center');
		divRow.classList.add('article');

		divColMD8.classList.add('col-md-8')
		art.classList.add('articleTitle');
		p_artTitle.classList.add('articleTitle');
		p_artDesc.classList.add('articleDesc');
		repoLink.classList.add('repoLink');

		art.id = idPrefix + item.id;
		p_artTitle.textContent = item.title;
		p_artDesc.textContent = item.description;
		repoLink.href = item.link;

        if(linkText === null)
		    repoLink.textContent = item.link;
        else
            repoLink.textContent = linkText;


		art.append(p_artTitle,p_artDesc,repoLink);
		divColMD8.append(art);
		divRow.append(divColMD8);
		container.append(divRow);
		
		console.log(item);
    });
}

export {getData,fillContainer};

