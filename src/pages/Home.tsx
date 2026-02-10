import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MiniCards from "../entities/Home/ui/MiniCards";
import Recharts from "../entities/Home/ui/Recharts";
import { setCards, setChartData } from '../shared/lib/redux/slices/homeSlice';

export default function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCards as any);
        dispatch(setChartData as any);
    }, [dispatch]);

    return (
        <div className="p-4 space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Панель управления</h1>
                <MiniCards />
            </div>
            <div>
                <Recharts />
            </div>
        </div>
    );
}