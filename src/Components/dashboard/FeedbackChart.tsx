"use client"

import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { PieLabelRenderProps } from 'recharts/types/polar/Pie'

interface DataItem {
  name: string
  value: number
}



const COLORS: string[] = ['#FF6B6B', '#4ECDC4', '#45B7D1']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  if (typeof cx !== 'number' || typeof cy !== 'number' || typeof innerRadius !== 'number' || typeof outerRadius !== 'number' || typeof percent !== 'number') {
    return null
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const Feedbackchart:React.FC<any> = ({feedback})=>{
  const [poor,setPoor] = useState<any>([])
  const [good,setGood] = useState<any>([])
  const [satisfying,setSatisfying] = useState<any>([])
  useEffect(() => {
    if (feedback) {
      setPoor(feedback.filter((item: any) => item.qaulity === "poor"));
      setGood(feedback.filter((item: any) => item.qaulity === "good"));
      setSatisfying(feedback.filter((item: any) => item.qaulity === "satisfying"));
    }
  }, [feedback]);
  

  const data: DataItem[] = [
    { name: 'Poor Quality', value: poor.length},
    { name: 'Satisfying', value: satisfying.length },
    { name: 'Good Quality', value: good.length },
  ]
  return (
    <div className="w-full max-w-md  h-[400px]">
      <h2 className="text-2xl font-bold text-center mb-4">Food Quality Preferences</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Feedbackchart;
