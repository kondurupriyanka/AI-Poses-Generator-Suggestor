import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Users } from 'lucide-react';

const Analysis: React.FC = () => {
  const data = [
    { name: 'Mon', accuracy: 85 },
    { name: 'Tue', accuracy: 88 },
    { name: 'Wed', accuracy: 92 },
    { name: 'Thu', accuracy: 90 },
    { name: 'Fri', accuracy: 95 },
    { name: 'Sat', accuracy: 93 },
    { name: 'Sun', accuracy: 97 },
  ];

  const stats = [
    {
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      label: 'AI Accuracy',
      value: '97%',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      label: 'Signs Recognized',
      value: '1,234',
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      label: 'Active Users',
      value: '5,678',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-white/60">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Recognition Accuracy Over Time</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Analysis;