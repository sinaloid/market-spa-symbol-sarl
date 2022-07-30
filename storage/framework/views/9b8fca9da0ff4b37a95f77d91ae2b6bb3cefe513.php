<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Africa Défis</title>
    <script src="https://kit.fontawesome.com/8b7c4e5629.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://touchpay.gutouch.com/touchpay/script/prod_touchpay-0.0.1.js" type="text/javascript"></script>
    <style>
        

        

        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .load-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f3f4f6;
            
        }

        .loader-spinner {
            width: 150px;
            height: 150px;
        }

        .loader-spinner svg {
            width: 90%;
            fill: none;
        }

        .load {
            transform-origin: 50% 50%;
            stroke-dasharray: 0.7 0.3;
            stroke-linecap: round;
            stroke-width: 5px;
            stroke: #3292f0;
        }

        .load.one {
            animation: load 1.5s infinite ease-in;
            animation-direction: reverse;
        }

        .load.two {
            fill: #3292f0;
        }

        .load.three {
            animation: load 1.5s infinite;
        }

        @keyframes  load {
            100% {
                transform: rotate(360deg);
            }
        }

        .loader-hide {
            display: none;
        }
    </style>
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div class="load-container preloader">
        <div class="loader-spinner">
            <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle class="load one" cx="60" cy="60" r="20" pathLength="1" />
                <circle class="load two" cx="60" cy="60" r="10" />
                <circle class="load three" cx="60" cy="60" r="30" pathLength="1" />
            </svg>
        </div>
    </div>
    <div id="app" class="container-fluid">

    </div>

    <script>
        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 100) {
                $('#ic-panier').addClass("show");
                $('#ic-panier').removeClass("hide");

            } else {
                $('#ic-panier').removeClass("show");
                $('#ic-panier').addClass("hide");

            }
        });
    </script>
    <script src="<?php echo e(asset('/js/app.js')); ?>" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
            
</body>

</html>
<?php /**PATH C:\Users\Ounoid\Documents\DevSinaloid\Projet\market app web et mobile\market-spa\resources\views/welcome.blade.php ENDPATH**/ ?>