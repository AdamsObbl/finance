import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTarget, selectTargets } from "../redux/TargetsSlice";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { TargetAdd } from "./TargetAdd";
// import { TargetList } from "./TargetList";

export function Targets() {
    const dispatch = useDispatch();
    const targets = useSelector(selectTargets);
    const [targetData, setTargetData] = useState([]);
    useEffect(() => {
        axios.get(BASE_URL + '/targets')
            .then(({ data }) => {
                setTargetData(data);
            })
    }, []);

    useEffect(() => {
        if (targets.length) {
            return;
        }
        targetData.forEach(element => {
            dispatch(addTarget(element));
        });
    }, [targetData, dispatch, targets.length]);


    return(<>
    {/* <TargetList /> */}
    <TargetAdd />
    </>);
}