        // Disease Detection Functionality
        document.getElementById('upload-area').addEventListener('click', function() {
            document.getElementById('leaf-upload').click();
        });

        document.getElementById('leaf-upload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('image-preview');
                    preview.innerHTML = `<img src="${event.target.result}" class="max-h-64 mx-auto rounded-lg shadow-md" alt="Leaf preview">`;
                    preview.classList.remove('hidden');
                    document.getElementById('upload-area').classList.add('hidden');
                    document.getElementById('analyze-btn').classList.remove('hidden');
                }
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('analyze-btn').addEventListener('click', function() {
            // Simulate API call with loading state
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="inline-flex items-center">Analyzing <span class="animate-pulse ml-1">...</span></span>';
            btn.disabled = true;

            // Simulate API delay
            setTimeout(function() {
                // Show results
                document.getElementById('results-placeholder').classList.add('hidden');
                document.getElementById('results-container').classList.remove('hidden');
                
                // Reset button
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Replace with actual API response data
                document.getElementById('disease-name').textContent = 'Powdery Mildew';
                document.getElementById('disease-confidence').textContent = 'Confidence: 92%';
                document.getElementById('disease-description').textContent = 'A fungal disease that appears as white powdery spots on leaves and stems. It thrives in humid conditions with moderate temperatures.';
                
                const treatmentsList = document.getElementById('treatment-options');
                treatmentsList.innerHTML = `
                    <li class="flex items-start">
                        <i data-feather="check-circle" class="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5"></i>
                        <span class="ml-2">Apply sulfur-based fungicide every 7-10 days</span>
                    </li>
                    <li class="flex items-start">
                        <i data-feather="check-circle" class="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5"></i>
                        <span class="ml-2">Increase air circulation around plants</span>
                    </li>
                    <li class="flex items-start">
                        <i data-feather="check-circle" class="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5"></i>
                        <span class="ml-2">Water plants at the base to avoid wetting leaves</span>
                    </li>
                    <li class="flex items-start">
                        <i data-feather="check-circle" class="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5"></i>
                        <span class="ml-2">Prune affected leaves and dispose of them properly</span>
                    </li>
                `;
                feather.replace();
            }, 2000);
        });

        // Initialize AOS animation
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Profile dropdown toggle
        document.getElementById('user-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('user-menu');
            menu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            if (menu.classList.contains('hidden')) {
                icon.setAttribute('data-feather', 'chevron-down');
            } else {
                icon.setAttribute('data-feather', 'chevron-up');
            }
            feather.replace();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('user-menu');
            const button = document.getElementById('user-menu-button');
            if (!button.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.add('hidden');
                const icon = button.querySelector('i');
                icon.setAttribute('data-feather', 'chevron-down');
                feather.replace();
            }
        });

        // Dashboard tabs functionality
        const tabs = document.querySelectorAll('.dashboard-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active', 'border-green-500', 'text-green-600'));
                tabs.forEach(t => t.classList.add('border-transparent', 'text-gray-500'));
                this.classList.add('active', 'border-green-500', 'text-green-600');
                this.classList.remove('border-transparent', 'text-gray-500');
            });
        });

        // Initialize charts
        document.addEventListener('DOMContentLoaded', function() {
            // Climate Chart
            const climateCtx = document.getElementById('climateChart').getContext('2d');
            const climateChart = new Chart(climateCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: [12, 15, 18, 22, 25, 28],
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'Rainfall (mm)',
                            data: [80, 70, 60, 40, 20, 10],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Price Chart
            const priceCtx = document.getElementById('priceChart').getContext('2d');
            const priceChart = new Chart(priceCtx, {
                type: 'bar',
                data: {
                    labels: ['Wheat', 'Corn', 'Soybean', 'Rice', 'Cotton'],
                    datasets: [
                        {
                            label: 'Current Price ($/ton)',
                            data: [280, 220, 520, 380, 1800],
                            backgroundColor: '#10b981'
                        },
                        {
                            label: '6-Month Forecast ($/ton)',
                            data: [310, 240, 480, 410, 1750],
                            backgroundColor: '#3b82f6'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });

            // Replace icons
            feather.replace();
        });
