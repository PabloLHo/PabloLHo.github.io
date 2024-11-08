
const auth_link = 'https://www.strava.com/oauth/token';

function getActivites(res){
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){

                var map = L.map('map').setView([38.895417, -77.033616], 11);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                for(var x=0; x<data.length; x++){

                    console.log(data[x].map.summary_polyline)
                    var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
                    console.log(coordinates)

                    L.polyline(

                        coordinates,
                        {
                            color:"green",
                            weight:5,
                            opacity:.7,
                            lineJoin:'round'
                        }

                    ).addTo(map)
                }

            }
        )
}

function reAuthorize() {
    fetch(auth_link, {
        method: 'post',

        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            client_id: '110958',
            client_secret: 'b8ded47d266e13b68efaac75b4c6025257a71134',
            refresh_token: '637461619a1366ea364590add31e37b1b0f02bdd',
            grant_type: 'refresh_token'

        })

    }).then(res => res.json())
        .then(res => getActivites(res))
}

reAuthorize()