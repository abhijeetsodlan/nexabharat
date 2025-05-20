import React from 'react';
import { Code, Shield, Zap, Users } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="rounded-full bg-gray-700/50 p-3 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-blue-400" />,
      title: "Simple Integration",
      description: "Copy and paste our code snippet into your site and you're ready to collect emails."
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Secure Storage",
      description: "All user data is encrypted and stored securely in our GDPR-compliant database."
    },
    {
      icon: <Zap className="h-6 w-6 text-teal-400" />,
      title: "Instant Setup",
      description: "No backend infrastructure needed. Get up and running in less than 5 minutes."
    },
    {
      icon: <Users className="h-6 w-6 text-pink-400" />,
      title: "Export Anytime",
      description: "Download your waitlist as CSV whenever you're ready to engage with your users."
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
          Purpose-Built for Founders Like You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;