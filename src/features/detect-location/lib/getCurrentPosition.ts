import { useState, useEffect } from "react";

interface locationType {
    loaded : boolean;
    coordinates?: {lat: number; lng: number};
    error?: {code: number; message: string};
}

export default function getCurrentPosition() {
    const [location, setLocation] =useState<locationType>({
        loaded: false,
    })
    
    //성공시
    const onSuccess = (location: {
        coords:{
            latitude: number;
            longitude: number;
        }
    }) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    //에러
    const onError = (error: {
        code: number; 
        message: string;
    }) => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        //geolocation을 지원하지 않는 경우
        if(!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            onSuccess,
            (err) => {
                onError({
                    code: err.code,
                    message: err.message,
                });
            },
            { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
        )
    }, [])

  return location;
}
