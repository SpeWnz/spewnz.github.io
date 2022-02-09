
async function getData(jsonPath){
    const res = await fetch(jsonPath);
    const data = await res.json();
    return(data);
}

//restituisce un div contenente un numero di br pari a "count"
function getBRspacers(count)
{
	const spacerCountainer = document.createElement('div');
	for(let i = 0; i < count; i ++)
	{
		spacerCountainer.append(document.createElement('br'));
	}
	return spacerCountainer;
}

/* prende in input il link di youtube e restituisce il div da inserire nel sito */
function getYouTubeDivNode(youTubeLink)
{

	//se è una playlist spezza e prendi la seconda parte
	if(youTubeLink.includes('list'))
	{
		var listSuffix = youTubeLink.split('?')[1];
		var link = "https://www.youtube.com/embed/videoseries?" + listSuffix;
	}
	else //se invece è un singolo video allora spezza in quest'altro modo
	{
		var suffix = youTubeLink.split('=')[1]
		var link = "https://www.youtube.com/embed/" + suffix;
	}

	const outerContainer = document.createElement('div'); //container esterno
	const iframeContainer = document.createElement('div');//container interno
	const iframe = document.createElement('iframe');
	

	iframe.setAttribute('src',link);
	iframe.setAttribute('frameborder','0');

	outerContainer.classList.add('outer-embed-container')
	iframeContainer.classList.add('inner-embed-container');

	iframeContainer.append(iframe);
	outerContainer.append(iframeContainer,getBRspacers(1));

	return outerContainer;
}

//restituisce vero se la stringa è un link di youtube
function isYouTubeLink(inputString)
{
	if(inputString.includes('https://youtube.') || inputString.includes('https://www.youtube.'))
		return true

	return false
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
		let resourceLinkContainer = document.createElement('div');
		const resourceLink = document.createElement('a');

		divRow.classList.add('row');
		divRow.classList.add('justify-content-md-center');
		divRow.classList.add('article');

		divColMD8.classList.add('col-md-8')
		art.classList.add('articleTitle');
		p_artTitle.classList.add('articleTitle');
		p_artDesc.classList.add('articleDesc');
		resourceLink.classList.add('resourceLink');

		art.id = idPrefix + item.id;
		p_artTitle.textContent = item.title;
		p_artDesc.textContent = item.description;
		resourceLink.href = item.link;

		//il link è un link di youtube?
		if(isYouTubeLink(item.link))
		{
			resourceLinkContainer = getYouTubeDivNode(item.link);
		}
		else
		{
			//è specificato un testo per il link?
			if(linkText === null)
				resourceLink.textContent = item.link;
			else
				resourceLink.textContent = linkText;

			resourceLinkContainer.append(resourceLink);
		}

		
		//esiste il campo "isPrivate"? 
		if(item.isPrivate != null)
		{
			const privateLabel_div = document.createElement('div');
			const privateLabel_p = document.createElement('p');
			const privateLabel_b = document.createElement('b');

			privateLabel_div.classList.add('privateContentLabel');
			privateLabel_b.classList.add('articleDesc');
			privateLabel_p.classList.add('articleDesc');
		
			privateLabel_b.textContent = "NOTE: ";
			privateLabel_p.textContent = "This repo is currently private.";


			privateLabel_p.prepend(privateLabel_b);
			privateLabel_div.append(privateLabel_p);

			art.append(p_artTitle,p_artDesc,privateLabel_div,resourceLink);
		}
		else
		{
			art.append(p_artTitle,p_artDesc,resourceLinkContainer);
		}

		divColMD8.append(art);
		divRow.append(divColMD8);
		container.append(divRow);
    });
}

export {fillContainer};
