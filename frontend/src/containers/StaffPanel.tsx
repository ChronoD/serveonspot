import { Button, Form, Input, Checkbox } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppointmentsList } from "../components/AppointmentsList";
import { LogOutButton } from "../components/LogOutButton";
import { SpecialistsList } from "../components/SpecialistsList";
import { authenticateStaffMember } from "../functions/apiFunctions";
import {
  selectAuthenticationHeader,
  setAuthenticationHeader,
} from "../state/appSlice";
import { Specialist } from "../state/dataTypes";
import { StaffPanelLogin } from "./StaffPanelLogin";

interface Props {}

export interface LoginDetails {
  username: string;
  password: string;
}

export function StaffPanel({}: Props) {
  const isAuthenticated = !!useSelector(selectAuthenticationHeader);

  const dispatch = useDispatch();

  const setHeaderAndAuthority = (header: string, authority: string) =>
    dispatch(setAuthenticationHeader({ header, authority }));

  const onSubmit = (values: LoginDetails) => {
    authenticateStaffMember(values, setHeaderAndAuthority);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {!isAuthenticated && <StaffPanelLogin onSubmit={onSubmit} />}
      {isAuthenticated && (
        <>
          <AppointmentsList />
          <LogOutButton />
        </>
      )}
    </div>
  );
}
