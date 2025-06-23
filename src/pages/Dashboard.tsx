/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Clock, X, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Vulnerability {
  type: string;
  count: number;
  severity: string;
  top_endpoints: string[];
}

interface Report {
  id: string;
  domain: string;
  total_vulnerabilities: number;
  vulnerabilities: Vulnerability[];
  zero_vulnerabilities: string[];
  urls_with_params: number;
  urls_without_params: number;
  createdAt: string;
}

interface ScheduledScan {
  id: string;
  url: string;
  frequency: 'daily' | 'weekly';
  time: string;
  createdAt: string;
  status?: string;
  severityCounts: { Low: number; Medium: number; High: number; Critical: number };
}

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [scheduledScans, setScheduledScans] = useState<ScheduledScan[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [scheduleUrl, setScheduleUrl] = useState('');
  const [scheduleFrequency, setScheduleFrequency] = useState<'daily' | 'weekly'>('daily');
  const [scheduleTime, setScheduleTime] = useState('00:00');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    if (isAuthenticated && user) {
      fetchScheduledScans();
      fetchReports();
    }
  }, [isAuthenticated, user]);

  const fetchScheduledScans = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://127.0.0.1:3000/schedules?userId=${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch scheduled scans');
      }
      const data = await response.json();
      const scans: ScheduledScan[] = data.map((scan: any) => ({
        id: scan._id.toString(),
        url: scan.url,
        frequency: scan.frequency,
        time: scan.time,
        createdAt: scan.createdAt,
        status: scan.status || 'Pending',
        severityCounts: scan.severityCounts || { Low: 0, Medium: 0, High: 0, Critical: 0 },
      }));
      setScheduledScans(scans);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching scheduled scans');
    }
  };

  const fetchReports = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://127.0.0.1:3000/schedules/reports?userId=${user.id}&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch reports');
      }
      const data = await response.json();
      const reports: Report[] = data.map((report: any) => ({
        id: report._id.toString(),
        domain: report.domain,
        total_vulnerabilities: report.total_vulnerabilities,
        vulnerabilities: report.vulnerabilities,
        zero_vulnerabilities: report.zero_vulnerabilities,
        urls_with_params: report.urls_with_params,
        urls_without_params: report.urls_without_params,
        createdAt: report.createdAt,
      }));
      setReports(reports);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching reports');
    }
  };

  const handleScheduleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      setError('Please log in to schedule a scan');
      return;
    }
    setIsLoading(true);
    setError(null);

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w .-]*)*\/?$/i;
    let formattedUrl = scheduleUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `http://${formattedUrl}`;
    }

    if (!urlPattern.test(formattedUrl)) {
      setError('Please enter a valid URL (e.g., vulnweb.com or http://vulnweb.com)');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:3000/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          url: formattedUrl,
          frequency: scheduleFrequency,
          time: scheduleTime,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          throw new Error(errorData.message || 'A scan with this URL and time already exists');
        }
        throw new Error(errorData.message || 'Failed to schedule scan');
      }

      const newScan = await response.json();
      setScheduledScans([
        ...scheduledScans,
        {
          id: newScan._id.toString(),
          url: newScan.url,
          frequency: newScan.frequency,
          time: newScan.time,
          createdAt: newScan.createdAt,
          status: 'Pending',
          severityCounts: newScan.severityCounts || { Low: 0, Medium: 0, High: 0, Critical: 0 },
        },
      ]);
      await fetchScheduledScans();
      setScheduleUrl('');
      setScheduleFrequency('daily');
      setScheduleTime('00:00');
    } catch (err) {
      setError((err as Error).message || 'An error occurred while scheduling the scan');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelScheduledScan = async (id: string) => {
    if (!isAuthenticated || !user) {
      setError('Please log in to cancel a scan');
      return;
    }
    if (!id) {
      setError('Invalid scan ID');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:3000/schedules/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel scheduled scan');
      }
      setScheduledScans(scheduledScans.filter((scan) => scan.id !== id));
      await fetchScheduledScans();
    } catch (err) {
      setError((err as Error).message || 'An error occurred while canceling the scan');
    }
  };

  const downloadReportPDF = async (reportId: string) => {
    if (!user) {
      setError('Please log in to download a report');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:3000/schedules/reports/${reportId}/pdf?userId=${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download report');
      }
      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = 'report.pdf';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) fileName = match[1];
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError((err as Error).message || 'No recent reports available. Schedule a scan to generate a report.');
    }
  };

  const getScanDay = (frequency: 'daily' | 'weekly', time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const scanDate = new Date(now);
    scanDate.setHours(hours, minutes, 0, 0);

    if (frequency === 'daily') {
      if (scanDate <= now) {
        scanDate.setDate(now.getDate() + 1);
      }
      return scanDate.toDateString() === new Date(now.getDate() + 1).toDateString()
        ? 'Tomorrow'
        : scanDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
      scanDate.setDate(now.getDate() + daysUntilSunday);
      return scanDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  const getScanName = (frequency: 'daily' | 'weekly') => {
    return frequency === 'daily' ? 'Daily Security Check' : 'Weekly Full Scan';
  };

  const severityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <MainLayout>
      <div className="pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-400 via-cyan-300 to-green-400 animate-pulse z-10"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-green-400 via-cyan-300 to-blue-400 animate-pulse z-10"></div>
      </div>
      <div className="relative px-4 md:px-8 py-6 text-white bg-gradient-to-br from-black via-gray-900 to-black min-h-screen overflow-hidden">
        <div className="w-full space-y-6">
          <div
            className={`bg-gray-900/80 backdrop-blur-md border border-blue-500 rounded-lg p-4 shadow-md transform transition-all duration-1000 ${
              open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <div className="flex items-center mb-3 text-blue-400">
              <Clock className="h-5 w-5 mr-1" />
              <h2 className="text-lg md:text-xl font-medium">Schedule a Scan</h2>
            </div>
            <form onSubmit={handleScheduleScan} className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input
                type="text"
                value={scheduleUrl}
                onChange={(e) => setScheduleUrl(e.target.value)}
                placeholder="Enter URL (e.g., vulnweb.com)"
                className="col-span-2 p-2 rounded-md bg-gray-800 text-sm md:text-base text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <select
                value={scheduleFrequency}
                onChange={(e) => setScheduleFrequency(e.target.value as 'daily' | 'weekly')}
                className="p-2 rounded-md bg-gray-800 text-sm md:text-base text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="p-2 rounded-md bg-gray-800 text-sm md:text-base text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="col-span-1 p-2 bg-gradient-to-r from-blue-500 to-green-500 text-sm md:text-base text-white rounded-md hover:from-blue-600 hover:to-green-600 transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
                disabled={isLoading || !scheduleUrl}
              >
                {isLoading ? 'Scheduling...' : 'Schedule Scan'}
              </button>
            </form>
          </div>
          {error && (
            <div className="text-center py-2 text-sm md:text-base text-red-500 bg-red-500/20 rounded-md">
              <p>{error}</p>
            </div>
          )}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 neon-glow">Security Scan Dashboard</h1>
            <p className="mt-2 text-sm md:text-base text-gray-300 max-w-2xl mx-auto">Manage your scheduled security scans and download vulnerability reports</p>
          </div>
          {scheduledScans.length > 0 && (
            <div className="bg-gray-900/80 backdrop-blur-md border border-blue-500 rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-3 text-blue-400">
                <Clock className="h-5 w-5 mr-1" />
                <h2 className="text-lg md:text-xl font-medium">Scheduled Scans</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {scheduledScans.map((scan) => (
                  <div key={scan.id} className="bg-gray-800 p-3 rounded-md border border-gray-700 hover:bg-gray-700 transition-all">
                    <p className="text-base md:text-lg font-medium text-white">{getScanName(scan.frequency)} - {getScanDay(scan.frequency, scan.time)} at {scan.time}</p>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">URL: {scan.url}</p>
                    <p className="text-xs md:text-sm text-gray-400">Status: {scan.status}</p>
                    <button
                      onClick={() => cancelScheduledScan(scan.id)}
                      className="mt-2 p-1.5 bg-red-500 text-xs md:text-sm text-white rounded-md hover:bg-red-600 transition-colors w-full flex items-center justify-center"
                    >
                      <X className="h-4 w-4 inline mr-1" /> Cancel
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {scheduledScans.length === 0 && !isLoading && (
            <div className="text-center py-6 text-sm md:text-base text-gray-500 bg-gray-900/50 rounded-md">
              <p>No scheduled scans yet. Add a new scan above to get started.</p>
            </div>
          )}
          {reports.length > 0 && (
            <div className="bg-gray-900/80 backdrop-blur-md border border-blue-500 rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-3 text-blue-400">
                <Clock className="h-5 w-5 mr-1" />
                <h2 className="text-lg md:text-xl font-medium">Recent Reports</h2>
              </div>
              {reports.map((report) => (
                <div key={report.id} className="bg-gray-800 p-4 rounded-md border border-gray-700 mb-4">
                  <h3 className="text-lg font-medium text-white">Domain: {report.domain}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mt-2">
                    <div>
                      <p><strong>Total Vulnerabilities:</strong> {report.total_vulnerabilities}</p>
                      <p><strong>URLs with Parameters:</strong> {report.urls_with_params}</p>
                    </div>
                    <div>
                      <p><strong>Scan Date:</strong> {new Date(report.createdAt).toLocaleString('en-US')}</p>
                      <p><strong>URLs without Parameters:</strong> {report.urls_without_params}</p>
                    </div>
                  </div>
                  {report.vulnerabilities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-blue-300 mb-2">Detected Vulnerabilities</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead className="bg-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Vulnerability Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Count</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Severity</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Top Affected Endpoints</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {report.vulnerabilities.map((vuln, index) => (
                              <tr key={index} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{vuln.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{vuln.count}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColor(vuln.severity)} text-white`}>
                                    {vuln.severity === 'Critical' ? '⚠️ ' : ''}{vuln.severity}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-300">
                                  <ul className="list-disc list-inside">
                                    {vuln.top_endpoints.map((endpoint, idx) => (
                                      <li key={idx} className="truncate max-w-md">{endpoint}</li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {report.zero_vulnerabilities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-green-400 mb-2">Non-Detected Vulnerabilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {report.zero_vulnerabilities.map((zeroVuln, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400"
                          >
                            ✅ {zeroVuln}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => downloadReportPDF(report.id)}
                    className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" /> Download PDF Report
                  </button>
                </div>
              ))}
            </div>
          )}
          {reports.length === 0 && !isLoading && (
            <div className="text-center py-6 text-sm md:text-base text-gray-500 bg-gray-900/50 rounded-md">
              <p>No reports available yet. Schedule a scan to generate a report.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};