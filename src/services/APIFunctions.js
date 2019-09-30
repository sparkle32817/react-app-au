
exports.getMention = async(filter, limit, datum) => {

    let response = await fetch("https://adcaller.com/creator_social_posts");
    let json = await response.json();

    console.log("total::", json.meta.totalResults);
    if (limit > json.meta.totalResults)
    {
        datum['request'] = false;
        return datum;
    }

    let mentions = json.data.attributes;

    let dataSet = []; let cnt = 0;
    for(let i=0; i<mentions.length; i++)
    {
        let displayData = {};

        let mention = mentions[i];

        let postid = mention.id;
        let usersid = mention.usersid;
        let social = mention.social;

        if (filter !== "" && social !== filter)
        {
            continue;
        }
        
        if (cnt === limit)
        {
            break;
        }

        displayData['text'] 		= mention.post_content.text;
        displayData['picture']	 	= mention.post_content.picture;
        displayData['social']	 	= social;
        displayData['created_time']	= mention.post_created_at;

        let data1 = await getUserInfo(usersid);
        let data2 = await getSocialInfo(postid);
        let data3 = await getBrandInfos(usersid, postid);
    
        displayData['user_name'] 	= data1.data.attributes[0].userinfo.displayname;
        displayData['user_avatar'] 	= data1.data.attributes[0].userinfo.avatar_url;
        displayData['reach']	    = data2.data.attributes[0].accountmetrics.reach;
        displayData['engagement']	= data2.data.attributes[0].accountmetrics.engagement;
        displayData['brands_count']	= data3['total_count'];
        displayData['brands']	    = data3['brands'];
    
        dataSet.push(displayData);

        cnt++;
    }

    dataSet['request'] = true;

    return dataSet;
}


const getUserInfo = async(userid) => {
    
    let url = "https://adcaller.com/users/"+userid;
    let response = await fetch(url);
    let json = await response.json();

    return json;
}

const getSocialInfo = async(postid) => {
    
    let url = "https://adcaller.com/creator_social_posts/"+postid+"/social";
    let response = await fetch(url);
    let json = await response.json();

    return json;
}

const getBrandInfos = async(userid, postid) => {

    let brandSet = [];
    let brands = [];

    let url1 = "https://adcaller.com/users/"+userid+"/mentions?qField=postid&qValue="+postid;
    let response1 = await fetch(url1);
    let json1 = await response1.json();
    
    let mentionIDs = json1.data.attributes;

    for (let i=0; i<mentionIDs.length; i++)
    {
        let brandsid = mentionIDs[i].brandsid;

        let url2 = "https://adcaller.com/brands/"+brandsid;
        let response2 = await fetch(url2);
        let json2 = await response2.json();
    
        let brand = [];
        brand['name'] = json2.data.attributes[0].brand_name;
        brand['logo'] = json2.data.attributes[0].brand_logo_url;

        brands.push(brand);
    }

    brandSet['total_count'] = json1.meta.totalResults;
    brandSet['brands']      = brands;

    return brandSet;
}

exports.getMentionCount = async() => {
    
    let url = "https://adcaller.com/users";
    let response = await fetch(url);
    let json = await response.json();

    let users = json.data.attributes;
    let dataSet = [];
    for(let i=0; i<users.length; i++)
    {
        let user = users[i];

        let data = await getUserMentionCount(user.siduser, user.userinfo.displayname, user.userinfo.avatar_url);

        dataSet.push(data);
    }
    
    for (let i=0; i<dataSet.length-1; i++)
    {
        for (let j=i+1; j<dataSet.length; j++)
        {
            if (dataSet[i]['mention_count'] < dataSet[j]['mention_count'])
            {
                [dataSet[i], dataSet[j]] = [dataSet[j], dataSet[i]];
            }
        }
    }

    return dataSet;
}

const getUserMentionCount = async(usersid, username, avatar) => {

    let url = "https://adcaller.com/users/"+usersid+"/mentions";
    let response = await fetch(url);
    let json = await response.json();
    
    let data = [];
    data['username'] = username;
    data['avatar'] = avatar;
    data['mention_count'] = json.meta.totalResults;

    return data;
}