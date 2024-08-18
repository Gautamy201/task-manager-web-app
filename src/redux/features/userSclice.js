import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetail, tokenIsExpired } from "../getUserDetail";
import axios from "axios";
import { getAllTaskApi, updateTaskApi, fetchUserDetailApi } from "../../api";

export const fetchTasks = createAsyncThunk("user/fetchTasks", async () => {
  const response = await axios.get(getAllTaskApi, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.data;
});

export const togaleCompletedTask = createAsyncThunk(
  "togaleCompletedTask",
  async (data) => {
    try {
      const response = await axios.put(`${updateTaskApi}${data._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        completed: !data.completed,
      });
      return response;
    } catch (err) {
      return err;
    }
    // return data._id;
  }
);

export const fetchUserDetail = createAsyncThunk("fetchUserDetail", async () => {
  const response = await axios.get(fetchUserDetailApi, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data.data;
});

const initialState = {
  userToken: localStorage.getItem("token"),
  userDetail: getUserDetail(localStorage.getItem("token")),
  isUserLogin: tokenIsExpired(localStorage.getItem("token")),
  allTasks: null,
  addTaskFormShow: false,
  result: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleAddTaskForm: (state) => {
      state.addTaskFormShow = !state.addTaskFormShow;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.allTasks = action.payload;
    });
    builder.addCase(fetchUserDetail.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
  },
});
export const { toggleAddTaskForm } = userSlice.actions;
export default userSlice.reducer;
