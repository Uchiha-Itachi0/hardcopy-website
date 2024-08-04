'use client'
import React, {useEffect, useState} from "react";
import {Filter, Filters, GetOrderErrorResponseModel, GetStoreRequestModel, Order} from "@/utils/types";
import OrderBox from "@/components/order_box";
import {HandleHome} from "@/utils/api/handle_home";
import {dateTimeFormatter} from "@/utils/validator/date_time_formatter";
import {useRouter} from "next/navigation";
import OrderShimmer from "@/components/order_shimmer";
import {useInView} from "react-intersection-observer";
import FilterButton from "@/components/filter_button";
import {filterData} from "@/data/filter_data";
import {handleApplyFilter, handleUnapplyFilter} from "@/utils/filter";
import DialogBox from "@/components/dialog_box";

interface HomeProps {
    filters: Filters; // Make sure Filters type is imported and available here
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
const Home: React.FC<HomeProps> = () => {

    let TOTAL_PAGE_PER_LOAD: number = 10;

    const [orders, setOrders] = useState<Order[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<Filters>(filterData);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterOrder, setFilterOrder] = useState<Order[]>([]);
    const [showDialog, setShowDialog] = React.useState(false);
    const [orderCompletion, setOrderCompletion] = useState<boolean[]>([]);
    const [dialogOrderIndex, setDialogOrderIndex] = useState<number | null>(null);
    const [isMarkingText, setIsMarkingText] = useState<boolean>(true);
    const handleFilterButton = () => setIsFilterOpen(!isFilterOpen);

    const handleApply = (filter: Filter) => {
        // Move the filter from apply to applied
        setFilters((prevFilters) => {
            return handleApplyFilter(prevFilters, filter);
        });
    };

    const handleUnapply = (filter: Filter) => {
        setFilters((prevFilters) => {
            return handleUnapplyFilter(prevFilters, filter);
        });
    };

    const { ref, inView } = useInView();
    const router = useRouter();

    useEffect(() => {
        getAllOrder(pageNumber)
            .then(r => setInitialLoading(false));
    }, []);

    useEffect(() => {
        setFilterOrder(orders);
        setOrderCompletion(Array(orders.length).fill(false));

    }, [orders]);

    useEffect(() => {
        if (inView && hasMore) {
            getAllOrder(pageNumber);
        }
        else if(!inView){
            setHasMore(true);
        }
    }, [inView]);

    useEffect(() => {
        setFiltersData();
    }, [filters]);

    const setFiltersData = () => {
        let filteredOrders: Order[] = [];
        const allFilterActive = filters.applied.some(filter => filter.text === "All" && filter.isActive);
        if(allFilterActive) return setFilterOrder(orders);
        else{
            filters.applied.forEach(appliedFilter => {
                filteredOrders = orders.filter(order => order.orderStatus === appliedFilter.text.toUpperCase());
            });
            setFilterOrder(filteredOrders);
        }
    }






    async function getAllOrder(_pageNumber: number) {
        console.log(filters);
        const storeRequest: GetStoreRequestModel = {
            storeId: localStorage.getItem('storeId')!,
            pageNumber: _pageNumber,
        };
        const response: Order[] | GetOrderErrorResponseModel = await HandleHome.getStores(storeRequest);
        console.log("response", response)

        if (isOrderArray(response)) {
            if (response.length === 0) {
                setHasMore(false);
                setInitialLoading(false);
                // No more orders to fetch
            } else {
                setOrders(prevOrder => {
                    // Filter out any duplicate orders
                    const uniqueOrders = response.filter(newOrder => !prevOrder.find(prev => prev.id === newOrder.id));
                    if (uniqueOrders.length === 0 && prevOrder.length <= 10) {
                        setHasMore(false);
                        return prevOrder;
                    }
                    return [...prevOrder, ...uniqueOrders];
                });
                if(response.length % 10 === 0){
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            }
        }

    }


    function isOrderArray(response: Order[] | GetOrderErrorResponseModel): response is Order[] {
        return Array.isArray(response);
    }

    const toggleDialog = (index: number) => {
        if(filterOrder[index]){
            setIsMarkingText(false);
        }
        else {
            setIsMarkingText(true);
        }
        setDialogOrderIndex(index);
        setShowDialog(true);
    };

    const handleDialogYes = async () => {
        if (dialogOrderIndex !== null) {
            const response = await HandleHome.markOrderAsComplete(orders[dialogOrderIndex].id);
            console.log("response", response)
            if (response.success){
                setOrders(prevOrders => {
                    const newOrders = [...prevOrders];
                    newOrders[dialogOrderIndex].orderStatus = response.message.split(": ")[1];
                    return newOrders;
                });
                setFiltersData();
            }
            setShowDialog(false);
        }
    };
    const handleDialogNo = (event: any) => {
        event.stopPropagation();
        setShowDialog(false);
    };

    return (
        <>

            {showDialog && <DialogBox message=
                                          {`${isMarkingText ? 
                                              'Are you sure you want to mark this order as Complete!' :
                                          'Are you sure you want to mark this order as Incomplete!'}`} showDialog={showDialog}
                                      onNo={handleDialogNo} onYes={handleDialogYes}/>}
            <div className="fixed z-40 flex items-center justify-between pl-56 pr-16 left-20 top-4 right-6 h-20 rounded-2xl dark:bg-dark-200">
                <div></div>
                    <FilterButton
                        text="Filter"
                        filters={filters}
                        isFilterOpen={isFilterOpen}
                        onClickFilterButton={handleFilterButton}
                        onApply={handleApply}
                        onUnapply={handleUnapply}
                    />
            </div>
            <div className={`relative h-full overflow-y-scroll`}>
                <div className={`flex flex-wrap mb-4 gap-8`}>
                    {initialLoading ? <OrderShimmer total={8} />
                        :
                        filterOrder.length > 0 ? (
                            filterOrder.map((order, index) =>
                            <div key={index} className={`pb-4`}>
                                <OrderBox
                                    orderStatus={order.orderStatus}
                                    toggleDialog={() => toggleDialog(index)}
                                    filesData={order.fileNames}
                                    totalFiles={order.fileNames.length}
                                    amount={order.orderAmount}
                                    phoneNumber={order.userId}
                                    userName={order.userName}
                                    dateTime={dateTimeFormatter(order.localDateTime)
                                }
                                />
                            </div>
                        )
                    ) : (
                        <div className={`flex flex-col items-center justify-center gap-4 w-full`}>
                            <h1 className={`text-blue-100 text-2xl`}>{orders.length > 0 ? 'Nothing to show' : 'No order has been placed. Be patient😁'}</h1>
                        </div>
                    )}
                </div>
                <div ref={ref} className={`flex items-center justify-center`}>
                    {
                        hasMore ?
                            <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600" />
                            :
                            filterOrder.length > 0 && <h1 className={`text-blue-100 text-2xl`}>No more orders to show.</h1>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;
