import React, { useEffect, useState, useMemo } from 'react';
import Button from '../../component/common/Button';
import Pagination from '../../component/common/Pagination';
import data from '../../mock/orderData.json';
import './index.css';
const ASC = 'asc'
const DESC = 'desc'
const randomOrderId = () => {
    return (Math.floor(Math.random() * 1000) + 1) + ''  
}
const sortBy = (vendorData, key, sortOrder) => {
    return vendorData.sort((a, b) => {
        if(sortOrder[key] == ASC) {
            return a[key].localeCompare(b[key])
        } else if(sortOrder[key] == DESC) {
            return b[key].localeCompare(a[key])
        }
    })
}
const Orders = () => {
    const [sortOrder, setOrder] = useState({
        vendorName: ASC,
        pickupDate: ASC,
        status: ASC,
    })
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const [vendorData, setVendorData] = useState([...data]);

    const tableData = useMemo(() => {
        const filteredData = vendorData.filter((item) =>
             Object.values(item).some((value) => {
                return value.toLowerCase().includes(searchTerm.toLowerCase())
             }
             )
        )
        
        const sortData = [...sortBy(filteredData, 'vendorName', sortOrder)]
        return sortData
    }, [searchTerm, vendorData, sortOrder.vendorName, sortOrder.pickupDate, sortOrder.status])
    
    
    const getCurrentItems = () => {
        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        
        return tableData.slice(indexOfFirstItem, indexOfLastItem);
    };
    const getPageCount = () => {
        return Math.ceil(tableData.length / ITEMS_PER_PAGE);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const toggleSortedOrder = (type) => {
        setOrder({
            ...sortOrder,
            [type]: sortOrder[type] === ASC ? DESC : ASC
        })
    }
    
   
    const [isOpen, setIsOpen] = useState(false)
    const handleModalToggle = () => {
        setIsOpen(!isOpen)
    }
    const [orders, setOrders] = useState({
        vendorName: '',
        pickupDate: '',
        status: ''
    })
    const handleOrders = (e) => {
        setOrders({
            ...orders,
            [e.target.name]: e.target.value
        })
    }

    
    const handleCreate = () => {
        setVendorData((prevState) => {
             const key = 'vendorName'
                const newOrder = [...prevState, {
                    orderId: randomOrderId(),
                    ...orders
                }]
                
                return newOrder
            }
        )
    }

    
    return (
        <div className="orders-page">
            <div className="k-flex k-jcsb">
                <h1>Orders Page</h1>
                <Button className="add-order-btn" onClick={handleModalToggle}>+ Add Order</Button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Vendor name"
                    name="vendorName"
                    value={orders.vendorName}
                    onChange={handleOrders}
                />
                <input
                    type="date"
                    name="pickupDate"
                    placeholder="Date"
                    value={orders.pickupDate}
                    onChange={handleOrders}
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={orders.status}
                    onChange={handleOrders}
                />
                <Button className="add-order-btn" onClick={handleCreate}>Create</Button>
                {JSON.stringify(orders)}
            </div>
            <div className="order-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Order Id</th>
                        <th onClick={() => toggleSortedOrder('vendorName')}>Vendor name {sortOrder['vendorName']}</th>
                        <th onClick={() => toggleSortedOrder('pickupDate')}>Pick up date {sortOrder['pickupDate']}</th>
                        <th onClick={() => toggleSortedOrder('status')}>Status {sortOrder['status']}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getCurrentItems().map((item) => (
                        <tr key={item.orderId}>
                        <td>{item.orderId}</td>
                        <td>{item.vendorName}</td>
                        <td>{item.pickupDate}</td>
                        <td><span className={`order__status--${item.status.toLowerCase()} k-pt4 k-pb4 k-pr4 k-pl4`}>{item.status}</span></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    pageCount={getPageCount()}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default Orders