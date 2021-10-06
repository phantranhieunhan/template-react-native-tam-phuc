import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configApp } from '../../../services/config';
import { ModalCustom } from '../../../components/modal';
import { actionMain } from '../../../utils/mainActions';
import { waittingNotPrint } from '../../../services/homeScreen/Waitting/WaittingNotPrint';
import { SaleInvoiceClient } from '../../../components/object/Order';


export const GetSaleInvoiceNotPrint = (props: any) => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state: any) => ({
    profileInfo: state?.auth?.profileInfo,
  }));
  const [userID, setUserID] = useState(profileInfo.UserID);
  const [pageIndex, setPageIndex] = useState('1');
  const [searchString, setsearchString] = useState('');

  const [data, setData] = useState(new Array<SaleInvoiceClient>());

  const onPressSearch = async () => {
   
    let dataGetSaleInvoiceNotePrinted = await waittingNotPrint(profileInfo.UserID, pageIndex, searchString);
    let result = dataGetSaleInvoiceNotePrinted.data;
  
    if (result?.StatusID == 1) {
      const data: Array<SaleInvoiceClient> = result.SaleInvoiceList;
      setData(data)
    }
    else {
      return null;
    }
  }
  return {
    userID, setUserID,
    pageIndex, setPageIndex,
    onPressSearch,
    data, setData,
    setsearchString

  }

}
